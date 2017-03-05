// @flow
//noinspection JSFileReferences
import sqlite from 'sql.js'
import fs from 'fs'

declare class DbQueryResult {
    values: string[][]
}

const dbFile = fs.readFileSync('db/usda-nnd.sqlite3');

const db = new sqlite.Database(dbFile);

const COLUMNS = [
    'carbohydrate_g',
    'protein_g',
    'fa_sat_g',
    'fa_mono_g',
    'fa_poly_g',
    'kcal',
    'description',
];

export function search(param: string): Array<Object> {
    const res: DbQueryResult[] = db.exec(`
        select ${COLUMNS.join(', ')} from entries
        where description like '%${param}%'
        limit 100
    `);

    if (res[0]) {
        return res[0].values.map((entry) => {
            const e = {};

            COLUMNS.forEach((c: string, idx: number) => {
                if (c.match(/^fa/)) {
                    e.fat_g = e.fat_g || '0.0';
                    e.fat_g = (
                        parseFloat(e.fat_g, 10) + parseFloat(entry[idx])
                    ).toFixed(2);
                } else {
                    e[c] = entry[idx];
                }
            });

            return e;
        });
    } else {
        return [];
    }
}