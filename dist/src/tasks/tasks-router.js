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
exports.tasksRouter.get('/tasks', tasks_controller_1.taskController.getAll);
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
exports.tasksRouter.put('/tasks', tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
exports.tasksRouter.delete('/tasks', tasks_controller_1.taskController.delete);
