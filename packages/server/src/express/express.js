import express from 'express';

const App = express();

App.set('port', process.env.PORT || 3000);
App.listen(App.get('port'), () =>
    console.log('[EXPRESS] Server listening on port', App.get('port'))
);
App.use(express.json());

export default App;
