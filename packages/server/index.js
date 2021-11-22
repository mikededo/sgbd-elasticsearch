import express from 'express';

import { ElasticClient } from './src';

// Express API REST
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
app.use(express.json());

app.post('/login', (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    res.send(`Email: ${email}. Password: ${password}`);
});

app.post('/register', (req, res) => {
    const body = req.body;
    const name = body.name;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;
    res.send(
        `Name: ${name}. Last name: ${lastName}. Email: ${email}. Password: ${password}`
    );
});

app.get('/players', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: req.body
    });

    res.send(result.body.hits.hits.map(x => x._source));
});

app.get('/user/:name/fav-players', (req, res) => {
    const players = [1, 5, 1205, 4589, 9999, 12125, 364, 7106];

    const result = players.map(async x => {
        const result = await ElasticClient.search({
            index: 'players',
            body: { query: { match: { id: x } } }
        });
        return result.body.hits.hits[0]._source;
    });

    res.send(result);
});

app.post('/user/:name/fav-players', (req, res) => {
});

app.delete('/user/:name/fav-players', (req, res) => {

});

app.get('/players/:id', async (req, res) => {
    const result = await ElasticClient.search({
        index: 'players',
        body: { query: { match: { id: req.params.id } } }
    });

    res.send(result.body.hits.hits[0]._source);
});
