import {
  Router,
  Request,
  Response
} from 'express';

// new router
export const tasksRouter: Router = Router();

tasksRouter.get('/tasks', (req: Request, res: Response) => {
  res.send('Hello World!');
})
