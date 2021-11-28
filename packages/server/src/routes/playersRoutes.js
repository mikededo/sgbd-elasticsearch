import express from 'express';
import { ElasticClient } from '../databases';

const routes = express.Router();

routes.get('/', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: req.body
    });
    res.status(200).send(result.body.hits.hits.map(({ _source }) => _source));
});

routes.get('/:id', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: { query: { match: { id: req.params.id } } }
    });
    res.status(200).send(result.body.hits.hits[0]._source);
});

export default routes;
