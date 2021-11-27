import { app, userRoutes, playersRoutes } from './src';

app.use('/user', userRoutes);
app.use('/players', playersRoutes);
