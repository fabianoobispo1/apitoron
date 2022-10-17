import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import EventController from './app/controllers/EventController';
import EventstousersController from './app/controllers/EventstousersController';

import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// realizar login
routes.post('/sessions', SessionController.store);
routes.post('/sessioncpf', SessionController.loginCpf);

// auth
routes.use(authMiddleware);

// recuperar info usuario
routes.get('/me', UserController.userInfo);

routes.post('/files', upload.single('file'), FileController.store);

// cadastrar usuario
routes.post('/createuser', UserController.createUser);

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
