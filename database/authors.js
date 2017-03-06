// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author} from '../model'

export default {
    findAll(offset: number, count: number) {
        return Bluebird.using(connection(), conn => {
            return conn.query('SELECT * FROM Author ORDER BY name LIMIT ?,?', [offset, count])
                .then((results: any[]) => {
                    return Bluebird.all(
                        results.map(res => new Author(res))
                    );
                });
        });
    },

    findOne(author_id: number) {
        return Bluebird.using(connection(), conn => {
            return conn.query('SELECT * FROM Author WHERE Author.id = ?', [author_id])
                .then((res: any[]) => {
                    if(res.length != 1) {
                        throw "Invalid author ID";
                    }

                    return new Author(res[0]);
                });
        });
    }
}