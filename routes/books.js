// @flow
import express from 'express'
import books from '../database/books'
import {Facet, Tag} from "../model";
import {BadRequest} from "../errors";
import SolrNode from 'solr-node';
import Bluebird from 'bluebird';

const route = express.Router();

const client = new SolrNode({
    host: '34.205.133.187',
    port: '8983',
    core: 'atacama',
    protocol: 'http'
});

const flatten = arr => arr.reduce(
    (acc, val) => acc.concat(
        Array.isArray(val) ? flatten(val) : val
    ),
    []
);

const facetFields = ["language",
    "author",
    "rights",
    "subject"];

route.get('/', (req: express.Request, res: express.Response, next) => {
    const offset: number = parseInt(req.query.offset || 0);
    const count: number = parseInt(req.query.count || 25);

    if (isNaN(count) || isNaN(offset)) {
        next(new BadRequest(`Both count and offset must be numeric if present`));
        return;
    }

    if (count <= 0 || count >= 500) {
        next(new BadRequest(`Count must be greater than 0 and less than 500`));
        return;
    }

    if (offset < 0) {
        next(new BadRequest(`Offset must be greater than or equal to 0`));
        return;
    }

    books.findAll(offset, count, req.user)
        .then((results) => res.json(results))
        .catch(error => next(error));
});

route.get('/db-search', (req: express.Request, res: express.Response, next) => {
    let title = req.query.q;

    books.findByTitleLike(title, req.user)
        .then(books => res.json(books))
        .catch(err => next(err));
});

route.get('/facet', (req: express.Request, res: express.Response, next) => {

    let query = client.query()
        .q(req.query.q)
        .fq(getFacetQueries(req))
        .addParams({
            wt: 'json',
        })
        .facetQuery({
            on: true,
            field: facetFields,
            mincount: 1
        })
        .start(0)
        .rows(0);

    client.search(query, (err, result) => {
        if (err) {
            return next(err);
        }

        let facets = result.facet_counts.facet_fields;

        res.json(Object.keys(facets).map((key) => new Facet(key, facets[key])));
    });
});

function getAsArray(query) {
    let values = query || [];
    if (!Array.isArray(values)) values = [values];
    return values;
}
function getFacetQueries(req) {
    let fq = flatten(Object.keys(req.query)
        .filter(key => key.match(/fq\..*/))
        .map(key => key.replace('fq.', ''))
        .map(field => {
            let values = getAsArray(req.query[`fq.${field}`]).map(value => '"' + value + '"');
            return {field, value: values.join(' ')};
        }));
    console.log(fq);
    return fq;
}
route.get('/search', (req: express.Request, res: express.Response, next) => {
    let page = req.query.page || 0;
    let count = req.query.count || 20;
    let query = client.query()
        .q(req.query.q)
        .fq(getFacetQueries(req))
        .addParams({
            wt: 'json',
            indent: true,
            fl: 'id'
        })
        .start(count * page)
        .rows(count);

    client.search(query, function (err, result) {
        if (err) {
            return next(err);
        }

        Bluebird.all(result.response.docs.map(b => books.findOne(b.id, req.user)))
            .then(books =>
                res.json({
                    pages: Math.ceil(result.response.numFound / count),
                    currentPageOffset: page,
                    results: books
                }))
            .catch(err => next(err));
    });
});

route.get('/recent', (req: express.Request, res: express.Response, next) => {
    books.findRecent(req.user)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.get('/:id', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if (isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.findOne(id, req.user)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.get('/:id/full-text', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if (isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    res.redirect('https://s3.amazonaws.com/atacama-books/' + id + '.epub');
});

route.get('/:id/tags', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if (isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.findTags(id)
        .then(results => res.json(results))
        .catch(error => next(error));
});

route.post('/:id/tags', (req: express.Request, res: express.Response, next) => {
    const id: number = parseInt(req.params.id);

    if (isNaN(id)) {
        next(new BadRequest(`The ID parameter must be numeric`));
        return;
    }

    books.addTag(id, new Tag(req.body))
        .then(results => res.json(results))
        .catch(error => next(error));
});

export default route;
