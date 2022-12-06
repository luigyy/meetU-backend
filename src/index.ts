//TODO: add usage to the response
import express from 'express';

import authenticationRoutes from './routes/authentication';
import adminRoutes from './routes/admin';
import NotFoundHandler from './middleware/NotFoundHandler';
import errorHandler from './middleware/errorHandler'; 
import config from './config/config';
import logger from './config/logging';
import mongoConnect from './config/mongoConnect';
import morgan from './config/morgan';
import checkRole from './middleware/checkRole';
import checkToken from './middleware/checkToken';
import cors from 'cors'
//import session from 'express-session'
require('dotenv').config()

const app : express.Application = express();

//connect to database
//TODO: stop listening if not properly connected to db
mongoConnect();

//send formatted JSON
app.set('json spaces', 2);

//middleware TODO: add security middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan);
app.use(cors())


//session stuff
//app.use(session({
 // name: 'express',
  //secret: 'mysecret',
  //saveUninitialized: true,
  //resave: false,
  //cookie: {
    //path: '*',
    //httpOnly: true,
    //maxAge: 60 * 60 //one hour in seconds
  //}
//}))


//routes middleware
app.use('/', authenticationRoutes); 
app.use('/admin', checkToken, checkRole(['ADMIN']), adminRoutes);
    
//404 and errorhandler
app.use(errorHandler);
app.use(NotFoundHandler);


app.listen(config.server.port, () => {
  console.clear();
  logger.info(`Listening on port ${config.server.port}`);
});

