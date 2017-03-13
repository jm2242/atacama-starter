// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author} from '../model'
import {NotFound} from "../errors";

export default {
    findAll(offset: number, count: number): Bluebird {
        return Bluebird
            .using(connection(), conn => conn.query('SELECT * FROM Author ORDER BY name LIMIT ?,?', [offset, count]))
            .then((results: any[]) => results.map(res => new Author(res)));
    },

    findOne(author_id: number): Bluebird {
        return Bluebird
            .using(connection(), conn => conn.query('SELECT * FROM Author WHERE Author.id = ?', [author_id]))
            .then((res: any[]) => {
                if (res.length != 1) {
                    throw new NotFound(`Author id ${author_id} not found`);
                }

                return new Author(res[0]);
            });
    }
}