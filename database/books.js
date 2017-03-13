// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author} from '../model'
import {NotFound, NotModified} from "../errors";

function populateTags(conn, book: Book) {
    return conn.query("select id, type, value from HasTag INNER JOIN Tag ON HasTag.tag_id = Tag.id AND HasTag.book_id = '?'", [book.id])
        .then((results: any[]) => {
            let tags = results.map(res => new Tag(res));
            let genres = tags.filter(tag => tag.type == 'genre');
            let series = tags.filter(tag => tag.type == 'series');
            let generic = tags.filter(tag => tag.type != 'genre' && tag.type != 'series');
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
            if (results.length == 0) {
                throw new NotFound(`Book id ${book_id} not found`);
            }

            return book_id;
        });
}

export default {
    findAll(offset: number, count: number): Bluebird {
        return Bluebird.using(connection(), (conn) => {
            return conn.query('SELECT * FROM Book ORDER BY publish_date LIMIT ?,?', [offset, count])
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

    findAllByAuthor(author_id: number, offset: number, count: number): Bluebird {
        return Bluebird.using(connection(), conn => {
            return conn.query('SELECT * FROM Book INNER JOIN AuthoredBy ON Book.id = AuthoredBy.book_id WHERE AuthoredBy.author_id = ? ORDER BY Book.publish_date LIMIT ?,?', [author_id, offset, count])
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

    findOne(id: number): Bluebird {
        return Bluebird.using(connection(), (conn) => {
            return conn.query("SELECT * FROM Book WHERE id = ?", [id])
                .then((res: any[]) => {
                    if (res.length != 1) {
                        throw new NotFound(`Book id ${id} not found`);
                    }
                    return new Book(res[0])
                })
                .then(book => populateTags(conn, book))
                .then(book => populateAuthors(conn, book));
        });
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
                        if (results.length != 0) {
                            return new Tag(results[0]);
                        } else {
                            return conn.query('INSERT INTO Tag SET ? ', {type: tag.type, value: tag.value})
                                .then(results => tag.withId(resutls.insertId));
                        }
                    })
                    .then((tag: Tag) => {
                        return conn.query('SELECT * FROM HasTag WHERE HasTag.book_id = ? AND HasTag.tag_id = ?', [book_id, tag.id])
                            .then((results: any[]) => {
                                if (results.length != 0) {
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