// @flow
import express from 'express'
import books from '../database/books'
import {Tag} from "../model";
import {BadRequest} from "../errors";

const route = express.Router();

route.get('/', (req: express.Request, res: express.Response, next) => {
    const offset: number = parseInt(req.query.offset || 0);
    const count: number = parseInt(req.query.count || 25);

    if(isNaN(count) || isNaN(offset)) {
        next(new BadRequest(`Both count and offset must be numeric if present`));
        return;
    }

    if(count <= 0 || count >= 500) {
        next(new BadRequest(`Count must be greater than 0 and less than 500`));
        return;
    }

    if(offset < 0) {
        next(new BadRequest(`Offset must be greater than or equal to 0`));
        return;
    }

    books.findAll(offset, count)
        .then((results) => res.json(results))
        .catch(error => next(error));
});

route.get('/:id', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.findOne(id)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.get('/:id/full-text', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    res.status(204).end();
});

route.get('/:id/tags', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.findTags(id)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.post('/:id/tags', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.addTag(id, new Tag(req.body))
        .then(results => res.json(results))
        .catch(error => next(error));
});

export default route;