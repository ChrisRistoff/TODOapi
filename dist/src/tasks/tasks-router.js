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
// new router
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskController = new tasks_controller_1.TaskController();
    const allTasks = yield taskController.getAll(req, res);
    res.send(allTasks);
}));
