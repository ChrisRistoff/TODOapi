import { TaskController } from './tasks-controller';
import {
  Router,
  Request,
  Response
} from 'express';
import { createValidator } from './tasks-validator';
import { validationResult } from 'express-validator';

// new router
export const tasksRouter: Router = Router();

tasksRouter.get('/tasks',async (req: Request, res: Response) => {

  // instantiate the task controller
  const taskController = new TaskController();

  // get all tasks from the controller
  const allTasks = await taskController.getAll(req, res);

  // send the tasks as the response
  res.send(allTasks);
});

// @ts-ignore
tasksRouter.post('/tasks', createValidator, async (req: Request, res: Response) => {

  // check if there are any validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {

    // return the validation errors
    return res.status(400).json({ errors: errors.array() });
  }

});
