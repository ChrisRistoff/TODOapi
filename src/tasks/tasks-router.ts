import { taskController } from './tasks-controller';
import {
  Router,
} from 'express';
import { createValidator } from './tasks-validator';

export const tasksRouter: Router = Router();

tasksRouter.get('/tasks',taskController.getAll)

// @ts-ignore
tasksRouter.post('/tasks', createValidator, taskController.create)
