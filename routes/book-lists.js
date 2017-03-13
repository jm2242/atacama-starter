// @flow
import express from 'express'
import lists from '../database/book-lists'
import books from "../database/books";
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

    lists.findAll(offset, count, req.user)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.get('/:id', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if(isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    lists.findOne(id, req.user)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.get('/:id/books', (req: express.Request, res: express.Response, next) => {
    const offset: number = parseInt(req.query.offset || 0);
    const count: number = parseInt(req.query.count || 25);
    const id: number = parseInt(req.params.id);

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

    if(offset < 0) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.findAllInBookList(id, offset, count, req.user)
        .then((results) => res.json(results))
        .catch(error => next(error));
});

export default route;