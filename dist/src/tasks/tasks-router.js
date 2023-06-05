"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
// new router
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get('/tasks', (req, res) => {
    res.send('Hello World!');
});
