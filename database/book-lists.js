// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author, BookList, User} from '../model'
import {NotFound, Forbidden} from "../errors";
import books from './books'
import mysql from 'promise-mysql'
import extend from 'extend'

function addBooksToBookList(conn: mysql.Connection, list: BookList, user: User) {
    return books.findAllInBookListWithConnection(conn, list.id, user).then((books: Book[]) => list.withBooks(books))
}

function _findOne(conn: mysql.Connection, id: number, user: User) {
    return conn.query('SELECT * FROM BookList WHERE BookList.id = ? AND BookList.owner = ?', [id, user.id])
        .then((res: any[]) => {
            if (res.length != 1) {
                throw new NotFound(`BookList id ${id} not found`);
            }

            return new BookList(res[0]);
        })
        .then((list: BookList) => addBooksToBookList(conn, list, user));
}
export default {
    findAll(offset: number, count: number, user: User): Bluebird {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        return Bluebird
            .using(connection(), conn =>
                conn.query('SELECT * FROM BookList WHERE owner = ? ORDER BY name LIMIT ?,?', [user.id, offset, count])
                    .then((results: any[]) => results.map(res => new BookList(res)))
                    .then((lists: BookList[]) => Bluebird.all(lists.map(list => addBooksToBookList(conn, list, user))))
            );
    },

    findOne(id: number, user: User): Bluebird {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }
        return Bluebird
            .using(connection(), conn => _findOne(conn, id, user));
    },

    create(data: any, user: User): Bluebird {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        const params = {
            name: data.name,
            description: data.description,
            owner: user.id
        };

        return Bluebird
            .using(connection(), conn => {
                return conn.query('INSERT INTO BookList SET ?', params)
                    .then((res: any) => _findOne(conn, res.insertId, user))
            });
    },

    addBookToBookList(list_id: number, book_id: number, user: User) {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        return Bluebird.using(connection(), conn =>
            conn.query('SELECT id FROM BookList WHERE id = ? AND owner = ?', [list_id, user.id])
                .then((results: any[]) => {
                    if (results.length == 0) {
                        throw new Forbidden(`You do not own book list ${list_id}`);
                    }
                })
                .then(() => conn.query('SELECT * FROM Contains WHERE book_id = ? and book_list_id = ?', [book_id, list_id]))
                .then((results: any[]) => {
                    if (results.length == 0) {
                        return conn.query('INSERT INTO Contains SET ?', {book_id, book_list_id: list_id})
                    }
                })
        );
    },

    removeBookFromBookList(list_id: number, book_id: number, user: User) {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        return Bluebird.using(connection(), conn =>
            conn.query('SELECT id FROM BookList WHERE id = ? AND owner = ?', [list_id, user.id])
                .then((results: any[]) => {
                    if (results.length == 0) {
                        throw new Forbidden(`You do not own book list ${list_id}`);
                    }
                })
                .then(() => conn.query('DELETE FROM Contains WHERE book_id = ? AND book_list_id = ?', [book_id, list_id]))
        );
    },

    update(id: number, data: any, user: User) {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        const params = {};

        if (data.name) {
            extend(params, {name: data.name});
        }

        if (data.description) {
            extend(params, {description: data.description});
        }

        return Bluebird.using(connection(), conn =>
            conn.query('UPDATE BookList SET ? WHERE id = ?', [params, id])
                .then(() => _findOne(conn, id, user))
        );
    },

    remove(id: number, user: User) {
        if (!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        const params = [id, user.id];

        return Bluebird.using(connection(), conn =>
            conn.query('SELECT * FROM BookList WHERE id = ? AND owner = ?', params)
                .then((results: any[]) => {
                    if (results.length != 1) {
                        throw new Forbidden(`You cannot delete BookList with ID ${id}`);
                    }
                })
                .then(() => conn.query('DELETE FROM BookList WHERE id = ? AND owner = ?', params))
                .then(() => conn.query('DELETE FROM Contains WHERE book_list_id = ?', [id]))
        );
    }
}