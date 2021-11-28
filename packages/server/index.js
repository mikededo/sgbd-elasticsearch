import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import { initElastic, initMysql, playersRoutes, userRoutes } from './src';

const App = express();

Promise.all([initElastic(), initMysql()]).then(() => {
    console.log('[EXPRESS] Databses initialised');

    App.set('port', process.env.PORT || 3000);
    App.listen(App.get('port'), () =>
        console.log('[EXPRESS] Server listening on port', App.get('port'))
    );

    App.use(bodyParser.urlencoded({ extended: false }));
    App.use(bodyParser.json());

    App.use(cors());
    App.options('*', cors());

    App.use('/user', userRoutes);
    App.use('/players', playersRoutes);
});

export default App;
