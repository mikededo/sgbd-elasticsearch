import Express from 'express';
import { ElasticClient, MysqlCon } from '../databases';

const Routes = Express.Router();

Routes.post('/login', (req, res) => {
    const body = req.body;
    const username = body.username;
    const email = body.email;
    const password = body.password;
    res.send(`Username: ${username}. Email: ${email}. Password: ${password}`);
});

Routes.post('/register', (req, res) => {
    const body = req.body;
    const username = body.username;
    const name = body.name;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;
    res.send(
        `Username: ${username}. Name: ${name}. Last name: ${lastName}. Email: ${email}. Password: ${password}`
    );
});

Routes.get('/:username/fav-players', async (req, res) => {
    try {
        MysqlCon.query('SELECT playerId FROM favouritePlayers WHERE username = ?', req.params.username, async (err, result) => {
            if (err) throw err;
            const favouritePlayers = await ElasticClient.search({
                index: 'players',
                body: { query: { terms: { id: result.map(x => x.playerId) } } }
            });
            res.send(favouritePlayers.body.hits.hits.map(x => x._source));
        });
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

Routes.post('/:username/fav-players', async (req, res) => {
    try {
        MysqlCon.query('INSERT IGNORE INTO favouritePlayers VALUES (?, ?);', [req.params.username, req.body.playerId], (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) res.status(409).send({ message: 'The player with id ' + req.body.playerId + ' was already in ' + req.params.username + '\'s favourite list' });
            else res.status(200).send('Request processed correctly');
        });
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

Routes.delete('/:username/fav-players', async (req, res) => {
    try {
        MysqlCon.query('DELETE FROM favouritePlayers WHERE username = ? AND playerId = ?;', [req.params.username, req.body.playerId], (err, result) => {
            if (err) throw err;
            if (result.affectedRows === 0) res.status(409).send({ message: 'The player with id ' + req.body.playerId + ' was not in ' + req.params.username + '\'s favourite list' });
            else res.status(200).send('Request processed correctly');
        });
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

export default Routes;
