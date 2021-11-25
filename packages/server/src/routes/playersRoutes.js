import Express from 'express';
import { ElasticClient } from '../databases';

const Routes = Express.Router();

Routes.get('/', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: req.body
    });
    res.send(result.body.hits.hits.map(x => x._source));
});

Routes.get('/:id', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: { query: { match: { id: req.params.id } } }
    });
    res.send(result.body.hits.hits[0]._source);
});

export default Routes;
