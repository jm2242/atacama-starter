// @flow
import Bluebird from 'bluebird'
import connection from './mysql'
import {User} from '../model'
import {NotFound} from "../errors";

export default {
    findOne(id: number) {
        return Bluebird.using(connection(), conn => {
            return conn.query('SELECT * FROM User WHERE id = ?', [id])
                .then((results: any[]) => {
                    if(results.length != 1) {
                        throw new NotFound(`User ${id} not found`);
                    }

                    return new User(results[0]);
                });
        });
    },

    findOrCreate(googleProfile: User) {
        return Bluebird.using(connection(), conn => {
            return conn.query('SELECT * FROM User WHERE email = ?', [googleProfile.email])
                .then((results: any[]) => {
                    if(results.length != 1) {
                        return conn.query('INSERT INTO User SET ?', googleProfile)
                            .then(res => googleProfile.copyWithNewId(res.insertId));
                    } else {
                        return new User(results[0]);
                    }
                });
        });
    }
};
