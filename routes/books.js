// @flow
import express from 'express'
import books from '../database/books'

const route = express.Router();

route.get('/', (req: express.Request, res: express.Response) => {
    const offset: number = parseInt(req.query.offset || 0);
    const count: number = parseInt(req.query.count || 25);

    if(isNaN(count) || isNaN(offset)) {
        res.status(400).json({message: 'If present, both count and offset must be numeric'});
        return;
    }

    if(count <= 0 || count >= 500) {
        res.status(400).json({message: 'Count must be greater than 0 and less than 500'});
        return;
    }

    if(offset < 0) {
        res.status(400).json({message: 'Offset must be greater than or equal to 0'});
        return;
    }

    books.findAll(offset, count)
        .then((results) => res.json(results))
        .catch(error => res.status(500).json({message: "Couldn't fetch data from the database", error}));
});

route.get('/:id', (req: express.Request, res: express.Response) => {
    const id: number = parseInt(req.params.id);

    console.log(req.params);
    console.log(id);

    if(isNaN(id)) {
        res.status(400).json({message: 'The ID must be a valid book identifier'});
        return;
    }

    books.findOne(id)
        .then(results => res.json(results))
        .catch(error => res.status(500).json({message: "Error while fetching data from the database", error}));
});

route.get('/:id/full-text', (req: express.Request, res: express.Response) => {
    res.json([]);
});

route.get('/:id/tags', (req: express.Request, res: express.Response) => {
    res.json([]);
});

route.post('/:id/tags', (req: express.Request, res: express.Response) => {
    res.json([]);
});

export default route;