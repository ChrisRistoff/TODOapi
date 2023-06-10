"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const tasks_controller_1 = require("./tasks-controller");
const express_1 = require("express");
const tasks_validator_1 = require("./tasks-validator");
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/tasks', tasks_controller_1.taskController.getAll);
// @ts-ignore
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
