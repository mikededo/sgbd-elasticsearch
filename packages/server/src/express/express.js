import Express from 'express';

const App = Express();

App.set('port', process.env.PORT || 3000);
App.listen(App.get('port'), () => console.log('[EXPRESS] Server listening on port', App.get('port')));
App.use(Express.json());

export default App;
