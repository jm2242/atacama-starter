// @flow
import mysql from 'promise-mysql'

const host = process.env.ATACAMA_DB_HOST || '';
const port: number = parseInt(process.env.ATACAMA_DB_PORT || '3306');
const user = process.env.ATACAMA_DB_USER || '';
const password = process.env.ATACAMA_DB_PASSWORD || '';
const database = process.env.ATACAMA_DB_SCHEMA || '';

const pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 10,

});

export function getConnection() {
    return pool.getConnection().disposer((connection) => {
        pool.releaseConnection(connection);
    });
}

export default getConnection;
