// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import mysql from 'promise-mysql'
import {Book, Tag, Author, User} from '../model'
import {NotFound, NotModified, Forbidden} from "../errors";

function populateTags(conn, book: Book) {
    return conn.query(
        "SELECT id, type, value " +
        "FROM HasTag " +
        "  INNER JOIN Tag ON HasTag.tag_id = Tag.id AND HasTag.book_id = '?'", [book.id])
        .then((results: any[]) => {
            let tags = results.map(res => new Tag(res));
            let genres = tags.filter(tag => tag.type === 'genre');
            let series = tags.filter(tag => tag.type === 'series');
            let generic = tags.filter(tag => tag.type !== 'genre' && tag.type !== 'series');
            book.genres = genres.map(tag => tag.value);
            book.series = series.map(tag => tag.value);
            book.tags = generic;
            return book;
        })
}

function populateAuthors(conn, book: Book) {
    return conn.query('SELECT Author.id, Author.name FROM AuthoredBy INNER JOIN Author ON Author.id = AuthoredBy.author_id AND AuthoredBy.book_id = ?', [book.id])
        .then((results: any[]) => {
            book.authors = results.map(res => new Author(res));
            return book;
        });
}

function validateBook(conn, book_id: number) {
    return conn.query('SELECT id, tag_id FROM Book LEFT JOIN HasTag ON Book.id = HasTag.book_id WHERE id = ?', [book_id])
        .then((results: any[]) => {
            if (results.length === 0) {
                throw new NotFound(`Book id ${book_id} not found`);
            }

            return book_id;
        });
}


function viewed(conn, book: Book, user: User) {
    if (user && book) {
        book.viewed = new Date(); // Force updated viewed date
        return conn
            .query('INSERT INTO Viewed SET ?', {
                user_id: user.id,
                book_id: book.id
            })
            .then(() => book);
    } else {
        return book;
    }
}

function findOneInternal(conn, id: number, user: User): Bluebird {
    const query = user === null || user === undefined ?
        // Query if anonymous access
        "SELECT *, FALSE AS saved, bucket IS NOT NULL AS has_fulltext" +
        "FROM Book " +
        "WHERE id = ?" :
        // Query if logged in
        "SELECT Book.*, viewed.date, EXISTS (" +
        "    SELECT * " +
        "    FROM Saved " +
        "    WHERE book_id = ? AND user_id = ?" +
        "  ) as saved, bucket IS NOT NULL AS has_fulltext " +
        "FROM Book " +
        "  LEFT JOIN (" +
        "    SELECT book_id, date " +
        "    FROM Viewed " +
        "    WHERE user_id = ? " +
        "    ORDER BY date DESC " +
        "    LIMIT 1" +
        "  ) AS viewed ON Book.id = viewed.book_id " +
        "WHERE Book.id = ?";
    const params = user === null || user === undefined ? [id] : [id, user.id, user.id, id];
    return conn.query(query, params)
        .then((res: any[]) => {
            if (res.length !== 1) {
                throw new NotFound(`Book id ${id} not found`);
            }
            return new Book(res[0])
        })
        .then(book => populateTags(conn, book))
        .then(book => populateAuthors(conn, book));
}

function _findAllInBookListWithConnection(conn: mysql.Connection, book_list_id: number, user: User): Bluebird {
    if (!user) {
        throw new Forbidden("You must be logged in to view this");
    }
    const query =
        'SELECT Book.*, saved, viewed.date ' +
        'FROM Book ' +
        '  INNER JOIN Contains ON Book.id = Contains.book_id ' +
        '  INNER JOIN BookList ON Contains.book_list_id = BookList.id AND BookList.owner = ?' +
        '  LEFT JOIN (' +
        '    SELECT book_id, date ' +
        '    FROM Viewed WHERE user_id = ? ' +
        '    GROUP BY user_id ORDER BY date DESC' +
        '  ) AS viewed ON Book.id = viewed.book_id ' +
        '  LEFT JOIN (' +
        '    SELECT COUNT(*) AS saved, book_id ' +
        '    FROM Saved WHERE user_id = ? ' +
        '    GROUP BY book_id' +
        '  ) AS saved ON Book.id = saved.book_id ' +
        'WHERE Contains.book_list_id = ? ' +
        'ORDER BY Book.publish_date ';
    const params = [user.id, user.id, user.id, book_list_id];

    return conn.query(query, params)
        .then((results: any[]) => {
            return Bluebird.all(
                results
                    .map(res => new Book(res))
                    .map(book => populateTags(conn, book))
                    .map(promise => promise.then(book => populateAuthors(conn, book)))
            );
        });

}

export default {
    findAll(offset: number, count: number, user: User): Bluebird {
        return Bluebird.using(connection(), (conn) => {
            const query = user === null || user === undefined ?
                // Query if anonymous access
                'SELECT *, FALSE AS saved, bucket IS NOT NULL AS has_fulltext ' +
                'FROM Book ' +
                'ORDER BY publish_date ' +
                'LIMIT ?,?' :
                // Query if logged in
                'SELECT Book.*, saved, viewed.date, bucket IS NOT NULL AS has_fulltext ' +
                'FROM Book ' +
                '  LEFT JOIN (' +
                '    SELECT book_id, date ' +
                '    FROM Viewed WHERE user_id = ? ' +
                '    ORDER BY date DESC LIMIT 1' +
                '  ) AS viewed ON Book.id = viewed.book_id ' +
                '  LEFT JOIN (' +
                '    SELECT COUNT(*) AS saved, book_id ' +
                '    FROM Saved ' +
                '    WHERE user_id = ? ' +
                '    GROUP BY book_id' +
                '  ) AS saved ON Book.id = saved.book_id ' +
                'ORDER BY Book.publish_date ' +
                'LIMIT ?,?';
            const params = user === null || user === undefined ? [offset, count] : [user.id, user.id, offset, count];
            return conn.query(query, params)
                .then((results: any[]) => {
                    return Bluebird.all(
                        results
                            .map((res) => new Book(res))
                            .map((book) => populateTags(conn, book))
                            .map((promise) => promise.then((book) => populateAuthors(conn, book)))
                    );
                })
        })
    },

    findRecent(user: User): Bluebird {
        return Bluebird.using(connection(), conn =>
            conn.query("SELECT book_id, MAX(date) FROM Viewed WHERE user_id = ? GROUP BY book_id ORDER BY MAX(date) DESC LIMIT 5", [user.id])
                .then((results: any[]) => {
                        return Bluebird.all(
                            results
                                .map(res => res.book_id)
                                .map(id => findOneInternal(conn, id, user))
                        );
                    }
                )
        );
    },

    findByTitleLike(title: string, user: User) {
        return Bluebird
            .using(connection(), conn =>
                conn.query("SELECT *, FALSE AS saved, bucket IS NOT NULL AS has_fulltext FROM Book WHERE title LIKE ? ORDER BY title", [`%${title}%`])
                    .then((results: any[]) => {
                        return Bluebird.all(
                            results
                                .map((res) => new Book(res))
                                .map((book) => populateTags(conn, book))
                                .map((promise) => promise.then((book) => populateAuthors(conn, book)))
                        );
                    })
            );
    },

    findAllByAuthor(author_id: number, offset: number, count: number, user: User): Bluebird {
        const query = user === null || user === undefined ?
            // Query if anonymous access
            'SELECT *, FALSE AS saved, bucket IS NOT NULL AS has_fulltext ' +
            'FROM Book ' +
            '  INNER JOIN AuthoredBy ON Book.id = AuthoredBy.book_id ' +
            'WHERE AuthoredBy.author_id = ? ' +
            'ORDER BY Book.publish_date ' +
            'LIMIT ?,?' :
            // Query if logged in
            'SELECT Book.*, saved, viewed.date, bucket IS NOT NULL AS has_fulltext ' +
            'FROM Book ' +
            '  INNER JOIN AuthoredBy ON Book.id = AuthoredBy.book_id ' +
            '  LEFT JOIN (' +
            '    SELECT book_id, date ' +
            '    FROM Viewed WHERE user_id = ? ' +
            '    GROUP BY user_id ' +
            '    ORDER BY date DESC' +
            '  ) AS viewed ON Book.id = viewed.book_id ' +
            '  LEFT JOIN (' +
            '    SELECT COUNT(*) AS saved, book_id ' +
            '    FROM Saved WHERE user_id = ? ' +
            '    GROUP BY book_id' +
            '  ) AS saved ON Book.id = saved.book_id ' +
            'WHERE AuthoredBy.author_id = ? ' +
            'ORDER BY Book.publish_date ' +
            'LIMIT ?,?';
        const params = user === null || user === undefined ? [author_id, offset, count] : [user.id, user.id, author_id, offset, count];
        return Bluebird.using(connection(), conn => {
            return conn.query(query, params)
                .then((results: any[]) => {
                    return Bluebird.all(
                        results
                            .map(res => new Book(res))
                            .map(book => populateTags(conn, book))
                            .map(promise => promise.then(book => populateAuthors(conn, book)))
                    );
                });
        });
    },

    findAllInBookListWithConnection(conn: mysql.Connection, book_list_id: number, user: User): Bluebird {
        return _findAllInBookListWithConnection(conn, book_list_id, user);
    },

    findAllInBookList(book_list_id: number, offset: number, count: number, user: User): Bluebird {
        return Bluebird.using(connection(), conn => _findAllInBookListWithConnection(conn, book_list_id, user));
    },

    findOne(id: number, user: User): Bluebird {
        return Bluebird.using(connection(), conn => findOneInternal(conn, id, user).then(book => viewed(conn, book, user)));
    },

    findTags(bookId: number): Bluebird {
        return Bluebird.using(connection(), conn =>
            conn.query("select type, value from HasTag LEFT JOIN Tag ON HasTag.tag_id = Tag.id AND HasTag.book_id = '?'", bookId))
            .then((results: any[]) => results.map(res => new Tag(res)));
    },

    addTag(book_id: number, tag: Tag): Bluebird {
        return Bluebird.using(connection(), conn => {
            return validateBook(conn, book_id)
                .then(() => conn.query('SELECT * FROM Tag WHERE type = ? AND value = ?', [tag.type, tag.value])
                    .then((results: any[]) => {
                        if (results.length !== 0) {
                            return new Tag(results[0]);
                        } else {
                            return conn.query('INSERT INTO Tag SET ? ', {type: tag.type, value: tag.value})
                                .then(results => tag.withId(results.insertId));
                        }
                    })
                    .then((tag: Tag) => {
                        return conn.query('SELECT * FROM HasTag WHERE HasTag.book_id = ? AND HasTag.tag_id = ?', [book_id, tag.id])
                            .then((results: any[]) => {
                                if (results.length !== 0) {
                                    return tag;
                                } else {
                                    return conn.query('INSERT INTO HasTag SET ?', {
                                        tag_id: tag.id,
                                        book_id
                                    }).then(() => tag);
                                }
                            });
                    })
                )

        });
    }
}