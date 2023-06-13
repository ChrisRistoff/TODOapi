"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const tasks_controller_1 = require("./tasks-controller");
const express_1 = require("express");
const tasks_validator_1 = require("./tasks-validator");
exports.tasksRouter = (0, express_1.Router)();
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
exports.tasksRouter.get('/tasks', tasks_controller_1.taskController.getAll);
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
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
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
exports.tasksRouter.put('/tasks', tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
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
exports.tasksRouter.delete('/tasks', tasks_controller_1.taskController.delete);
