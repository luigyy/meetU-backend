import express from 'express';

//file imports 
import checkTokenMiddleware from '../middleware/checkToken';
import {
  postLogin, 
  postRegister,
  checkToken
} from '../controllers/authenticationController';

const router: express.Router = express.Router();

//POST routes
router.post('/login', postLogin);
router.post('/register', postRegister);
router.post('/checkToken', checkTokenMiddleware, checkToken);


//test route
router.get('/test',(_, res: express.Response) => {
  return res.send(" hello from test route ")
})

export default router;
