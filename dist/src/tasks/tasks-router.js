"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const tasks_controller_1 = require("./tasks-controller");
const express_1 = require("express");
const tasks_validator_1 = require("./tasks-validator");
const express_validator_1 = require("express-validator");
// new router
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // instantiate the task controller
    const taskController = new tasks_controller_1.TaskController();
    // get all tasks from the controller
    const allTasks = yield taskController.getAll(req, res);
    // send the tasks as the response
    res.send(allTasks);
}));
// @ts-ignore
exports.tasksRouter.post('/tasks', tasks_validator_1.createValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // check if there are any validation errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // return the validation errors
        return res.status(400).json({ errors: errors.array() });
    }
}));
