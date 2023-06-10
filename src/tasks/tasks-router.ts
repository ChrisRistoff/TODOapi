import { TaskController } from './tasks-controller';
import {
  Router,
  Request,
  Response
} from 'express';

// new router
export const tasksRouter: Router = Router();

tasksRouter.get('/tasks',async (req: Request, res: Response) => {
  const taskController = new TaskController();
  const allTasks = await taskController.getAll(req, res);

  res.send(allTasks);
})
