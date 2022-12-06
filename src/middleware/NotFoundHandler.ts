import ReqHandler from '../types/ReqHandler';
import ResponseInterface  from '../interfaces/response';

const NotFoundHandler: ReqHandler = (_, res, __) => {

  const response: ResponseInterface = {
    statusCode: 404,
    error: true,
    message: 'Endpoint not found',
  }
  res.status(404).json(response); 
}

export default NotFoundHandler;
