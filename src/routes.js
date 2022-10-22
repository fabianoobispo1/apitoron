import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import EventController from './app/controllers/EventController';
import EventstousersController from './app/controllers/EventstousersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// realizar login
routes.post('/sessions', SessionController.store);
routes.post('/sessioncpf', SessionController.loginCpf);

// cadastrar usuario
routes.post('/createuser', UserController.createUser);

// auth
routes.use(authMiddleware);

// recuperar info usuariop
routes.get('/me', UserController.userInfo);

// recuperar info usuario
routes.get('/userlist', UserController.userList);

// adiministrador
routes.post('/verificaadministrador', UserController.verificaadministrador);
routes.post('/administradorupdate', UserController.administradorUpdate);

// eventos
routes.get('/listevents', EventController.listarEvento);
routes.post('/createevents', EventController.criarEvento);

// eventos por usuario
routes.post(
  '/listeventsToUserEmail',
  EventstousersController.listeventsToUserEmail
);

// auth
routes.use(authMiddleware);
export default routes;
