import express from 'express';
import catchAll from './3-middleware/catch-all';
import routeNotFound from './3-middleware/route-not-found';
import vacationController from './6-controllers/vacationController';
import CONFIG from './config';
import expressFileUpload from 'express-fileupload';
import logRequest from './2-utils/logRequests';
import AuthController from './6-controllers/authController';
import likesController from './6-controllers/likesController';
import helmet from 'helmet';
import cors from 'cors';
import sanitize from './3-middleware/sanitize';

const server = express();

server.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
server.use(logRequest);
server.use(cors());
server.use(express.json());
server.use(sanitize);
server.use(expressFileUpload());
server.use('/api', vacationController);
server.use('/api', AuthController);
server.use('/api', likesController);

server.use('*', routeNotFound);

server.use(catchAll);

server.listen(CONFIG.PORT, () => {
  console.log(`listening on http://localhost:${CONFIG.PORT}`);
});
