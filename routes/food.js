// @flow
import express from 'express'
import {search} from '../db.js'

const route = express.Router();

route.get('/', (req: express.Request, res: express.Response) => {
    const query = req.query.q;

    if(!query) {
        res.json({
            error: 'Missing required parameter `q`'
        });
        return;
    }

    const results = search(query);
    res.json(results);
});

export default route;