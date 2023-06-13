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

/**
  * @swagger
  * /tasks:
  *  post:
  *  description: Create a new task
  *  requestBody:
  *  required: true
  *  content:
  *  application/json:
  *  schema:
  *  $ref: '#/components/schemas/Task'
  *  responses:
  *   '200':
  *     description: Success
  *     content:
  *     application/json:
  *     schema:
  *     $ref: '#/components/schemas/Task'
  */
tasksRouter.post('/tasks', createValidator, taskController.create)

/**
  * @swagger
  * /tasks:
  * put:
  * description: Update a task
  * requestBody:
  * required: true
  * content:
  * application/json:
  * schema:
  * $ref: '#/components/schemas/Task'
  * responses:
  *   '200':
  *   description: Success
  *   content:
  *   application/json:
  *   schema:
  *   $ref: '#/components/schemas/Task'
  */
tasksRouter.put('/tasks', updateValidator, taskController.update)

/**
  * @swagger
  * /tasks:
  * delete:
  * description: Delete a task
  * requestBody:
  * required: true
  * content:
  * application/json:
  * schema:
  * $ref: '#/components/schemas/Task'
  * responses:
  *  '200':
  *  description: Success
  *  content:
  *  application/json:
  *  schema:
  *  $ref: '#/components/schemas/Task'
  */
tasksRouter.delete('/tasks', taskController.delete)
