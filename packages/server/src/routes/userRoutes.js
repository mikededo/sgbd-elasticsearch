import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ElasticClient, MysqlCon } from '../databases';
import { jwtAuthCall } from '../middlewares';

const routes = express.Router();

// HELPERS
const getJWT = (email, password) =>
    jwt.sign(
        {
            email,
            password,
            until: new Date().getTime() + 86400000
        },
        'super-secret-word'
    );

routes.post('/login', (req, res) => {
    const { body } = req;

    if (!body.email || !body.password) {
        res.status(400).send(
            'Body must have { email: string, password: string }'
        );
        return;
    }

    MysqlCon.query(
        'SELECT * FROM users WHERE email = ?',
        body.email,
        (err, result) => {
            if (err) {
                console.log(`[MYSQL] Error during login ${err}`);
                res.status(400).send(err);
                return;
            }

            const user = result[0];

            if (bcrypt.compareSync(body.password, user.password)) {
                res.status(200).send({
                    user: user,
                    token: getJWT(user.email, user.password)
                });
            } else {
                res.status(404).send('Incorrect credentials');
            }
        }
    );
});

routes.post('/register', (req, res) => {
    const { body } = req;

    if (!body.password || !body.email) {
        res.status(400).send(
            'Body must include { email: string, password: string }'
        );
        return;
    }

    MysqlCon.query(
        'INSERT INTO users (name, lastName, email, password) VALUES (?, ?, ?, ?)',
        [
            body.name,
            body.lastName,
            body.email,
            bcrypt.hashSync(body.password, bcrypt.genSaltSync(10))
        ],
        (err, result) => {
            if (err) {
                console.log(`[MYSQL] 🔴 Error during register -> ${err}`);
                res.status(400).send(err);
                return;
            }

            MysqlCon.query(
                'SELECT * FROM users WHERE id = ?',
                result.insertId,
                (err, user) => {
                    console.log(user);

                    if (err) {
                        res.status(500);
                        return;
                    }

                    // Send user with the token
                    res.status(201).send({
                        user: user[0],
                        token: getJWT(user[0].email, user[0].password)
                    });
                }
            );
        }
    );
});

routes.get('/:id/fav-players', jwtAuthCall, (req, res) => {
    try {
        MysqlCon.query(
            'SELECT playerId FROM favouritePlayers WHERE userId = ?',
            +req.params.id,
            async (err, result) => {
                if (err) throw err;

                const favouritePlayers = await ElasticClient.search({
                    index: 'players',
                    body: {
                        query: {
                            terms: {
                                id: result.map(({ playerId }) => playerId)
                            }
                        }
                    }
                });

                res.status(200).send(
                    favouritePlayers.body.hits.hits.map(
                        ({ _source }) => _source
                    )
                );
            }
        );
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

routes.post('/:id/fav-players/:playerId', jwtAuthCall, (req, res) => {
    try {
        MysqlCon.query(
            'INSERT IGNORE INTO favouritePlayers VALUES (?, ?);',
            [+req.params.id, +req.params.playerId],
            (err, result) => {
                if (err) throw err;

                if (result.affectedRows === 0) {
                    res.status(409).send({
                        message: `The player with id ${req.body.playerId} was already in ${req.params.id}'s favourite list`
                    });
                } else {
                    res.status(204).send();
                }
            }
        );
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

routes.delete('/:id/fav-players/:playerId', jwtAuthCall, (req, res) => {
    try {
        MysqlCon.query(
            'DELETE FROM favouritePlayers WHERE userId = ? AND playerId = ?;',
            [+req.params.id, +req.params.playerId],
            (err, result) => {
                if (err) throw err;

                if (result.affectedRows === 0) {
                    res.status(409).send({
                        message: `The player with id ${req.body.playerId} was not in ${req.params.id}'s favourite list`
                    });
                } else {
                    res.status(204).send();
                }
            }
        );
    } catch ({ message: msg }) {
        console.error('[MYSQL]', msg);
        res.status(500).send({ message: msg });
    }
});

export default routes;
