// @flow
import express from 'express'

const route = express.Router();

route.get('/', (req: express.Request, res: express.Response) => {
    res.json([]);
});

route.get('/:id', (req: express.Request, res: express.Response) => {
    res.json({});
});

route.get('/:id/books', (req: express.Request, res: express.Response) => {
    res.json([]);
});

export default route;