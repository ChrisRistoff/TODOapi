import { taskController } from './tasks-controller';
import {
  Router,
} from 'express';
import { createValidator, updateValidator } from './tasks-validator';

export const tasksRouter: Router = Router();

/**
  * @swagger
  * /tasks:
  *   get:
  *   tags: [Tasks]
  *   description: Get all tasks
  *   responses:
  *   '200': 
  *     description: Success
  *     content:
  *       application/json:
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/components/schemas/Task'
  */
tasksRouter.get('/tasks',taskController.getAll)

tasksRouter.post('/tasks', createValidator, taskController.create)

tasksRouter.put('/tasks', updateValidator, taskController.update)

tasksRouter.delete('/tasks', taskController.delete)
