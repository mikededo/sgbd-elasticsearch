import { App, userRoutes, playersRoutes } from './src';

App.use('/user', userRoutes);

App.use('/players', playersRoutes);
