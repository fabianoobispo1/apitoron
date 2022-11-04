import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import EventController from './app/controllers/EventController';
import EventstousersController from './app/controllers/EventstousersController';
import LojaController from './app/controllers/LojaController';

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
// recuperar lista de usuarios
routes.get('/userlist', UserController.userList);
// atualizar usuario
routes.post('/atualizarusuario', UserController.atualizausuario);
// remover usuario
routes.post('/removerusuario', UserController.removerusuario);

// recuperar lista de lojas
routes.get('/lojalist', LojaController.lojaList);
// cadastrar nova loja
routes.post('/cadastrarLoja', LojaController.cadastrarLoja);
// atualizar loja
routes.post('/atualizarloja', LojaController.atualizaloja);
// remover loja
routes.post('/removerloja', LojaController.removerloja);

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
