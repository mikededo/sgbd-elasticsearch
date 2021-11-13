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
    const lastName = body.last_name;
    const email = body.email;
    const password = body.password;
    res.send(
        `Name: ${name}. Last name: ${lastName}. Email: ${email}. Password: ${password}`
    );
});
