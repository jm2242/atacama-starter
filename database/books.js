// @flow
import mysql from 'mysql'
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author} from '../model'

function populateTags(conn, book: Book) {
    return conn.query('SELECT id, type, value FROM Tag INNER JOIN HasTag ON Tag.id = HasTag.tag_id WHERE HasTag.book_id = ?', [book.id])
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
    return conn.query('SELECT id, name FROM Author INNER JOIN AuthoredBy ON Author.id = AuthoredBy.author_id WHERE AuthoredBy.book_id = ?', [book.id])
        .then((results: any[]) => {
            book.authors = results.map(res => new Author(res));
            return book;
        });
}

export default {
    findAll(offset: number, count: number): Bluebird {
        return Bluebird.using(connection(), (conn) => {
            return conn.query('SELECT * FROM `Book` ORDER BY publish_date LIMIT ?,?', [offset, count])
                .then((results: any[]) => {
                    return Bluebird.all(
                        results
                            .map((res) => new Book(res))
                            .map((book) => populateTags(conn, book))
                            .map((promise) => promise.then((book) => populateAuthors(conn, book)))
                    );
                })
        })
    }
}