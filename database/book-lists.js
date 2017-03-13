// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {Book, Tag, Author, BookList, User} from '../model'
import {NotFound, Forbidden} from "../errors";

export default {
    findAll(offset: number, count: number, user: User): Bluebird {
        if(!user) {
            throw new Forbidden("You must be logged in to view this page");
        }

        return Bluebird
            .using(connection(), conn => conn.query('SELECT * FROM BookList WHERE owner = ? ORDER BY name LIMIT ?,?', [user.id, offset, count]))
            .then((results: any[]) => results.map(res => new BookList(res)));
    },

    findOne(id: number, user: User): Bluebird {
        if(!user) {
            throw new Forbidden("You must be logged in to view this page");
        }
        return Bluebird
            .using(connection(), conn => conn.query('SELECT * FROM BookList WHERE BookList.id = ? AND BookList.owner = ?', [id, user.id]))
            .then((res: any[]) => {
                if (res.length != 1) {
                    throw new NotFound(`BookList id ${id} not found`);
                }

                return new BookList(res[0]);
            });
    }
}