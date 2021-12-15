import express from 'express';

import { ElasticClient } from '../databases';

const routes = express.Router();

routes.get('/', async (req, res) => {
    const { from, limit, count } = req.query;

    const result = await ElasticClient.search({
        index: 'players',
        from,
        size: limit
    });

    if (count) {
        const { body } = await ElasticClient.count({ index: 'players' });

        res.status(200).send({
            players: result.body.hits.hits.map(({ _source }) => _source),
            total: body.count
        });

        return;
    }

    res.status(200).send({
        players: result.body.hits.hits.map(({ _source }) => _source)
    });
});

const rangeQueriesFromFilters = (filters) => {
    const must = Object.entries({
        age: filters.age,
        height: filters.height,
        weight: filters.weight
    }).reduce(
        (result, [k, v]) =>
            v
                ? [
                      ...result,
                      v?.start === v?.end
                          ? { match: { [k]: { query: v.start } } }
                          : { range: { [k]: { gte: v.start, lte: v.end } } }
                  ]
                : result,
        []
    );

    return Object.keys(must).length === 0 ? [] : must;
};

const shouldFromFilters = (filters) =>
    filters.traits
        ? [
              { terms: { firstStrongPoint: filters.traits } },
              { terms: { secondStrongPoint: filters.traits } },
              { terms: { thirdStrongPoint: filters.traits } },
              { terms: { fourthStrongPoint: filters.traits } }
          ]
        : [];

const fullNameFromFilters = (filters) =>
    filters.fullName
        ? [
              {
                  query_string: {
                      default_field: 'fullName',
                      query: `*${filters.fullName}*`
                  }
              }
          ]
        : [];

const filterFromFilters = (filters) =>
    Object.entries({
        'country.key': filters.countries,
        position: filters.positions,
        strongFoot: filters.strongFoots,
        firstStrongPoint: filters.firstStrongPoints,
        secondStrongPoint: filters.secondStrongPoints,
        thirdStrongPoint: filters.thirdStrongPoints,
        fourthStrongPoint: filters.fourthStrongPoints
    }).reduce(
        (result, [k, v]) => (v ? [...result, { terms: { [k]: v } }] : result),
        []
    );

routes.post('/', async (req, res) => {
    const { from, limit } = req.query;
    const { filters } = req.body;

    const should = shouldFromFilters(filters);

    const result = await ElasticClient.search({
      index: 'players',
      from,
      size: limit,
      body: {
        query: {
          bool: {
            must: fullNameFromFilters(filters),
            should,
            minimum_should_match: should.length ? 1 : 0,
            filter: [
              ...rangeQueriesFromFilters(filters),
              ...filterFromFilters(filters)
            ]
          }
        }
      }
    });

    res.status(200).send({
        players: result.body.hits.hits.map(({ _source }) => _source),
        total: result.body.hits.total.value
    });
});

routes.get('/:id', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: { query: { match: { id: req.params.id } } }
    });

    res.status(200).send(result.body.hits.hits[0]._source);
});

export default routes;
