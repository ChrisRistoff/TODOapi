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
exports.taskController = void 0;
const __1 = require("../..");
const tasks_entity_1 = require("./tasks-entity");
const class_transformer_1 = require("class-transformer");
const express_validator_1 = require("express-validator");
class TaskController {
    getAll(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all tasks from the database await this.taskRepository.find();
                let allTasks = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    order: {
                        date: 'ASC',
                    },
                });
                // convert the tasks to plain objects
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return res.json(allTasks).status(200);
            }
            catch (error) {
                return res.json({ error: 'internal server error' }).status(500);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if there are any validation errors
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                // return the validation errors
                return res.status(400).json({ errors: errors.array() });
            }
            // create a new task instance
            const newTask = new tasks_entity_1.Task();
            // set the task's properties
            newTask.title = req.body.title;
            newTask.date = req.body.date;
            newTask.description = req.body.description;
            newTask.status = req.body.status;
            newTask.priority = req.body.priority;
            // save the task to the database
            try {
                let savedTask = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                // convert the task to a plain object
                savedTask = (0, class_transformer_1.instanceToPlain)(savedTask);
                // return the newly created task
                return res.json(savedTask).status(201);
            }
            catch (error) {
                return res.json({ error: 'internal server error' }).status(500);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if there are any validation errors
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                // return the validation errors
                return res.status(400).json({ errors: errors.array() });
            }
            let task;
            // get the task from the database by id
            try {
                task = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({
                    where: { id: req.body.id },
                });
            }
            catch (error) {
                return res.json({ error: 'internal server error' }).status(500);
            }
            if (!task) {
                return res.json({ error: 'task not found' }).status(404);
            }
            // update the task's properties
            task.status = req.body.status;
            task.priority = req.body.priority;
            // variable that will hold the updated task
            let updatedTask;
            // update the task
            try {
                updatedTask = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).update(
                // plainToInstance converts the plain object to an instance of the Task class
                // this is necessary because the update method expects an instance of the Task class
                task.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, {
                    status: req.body.status,
                    priority: req.body.priority
                }));
                // convert the updated task to a plain object
                updatedTask = (0, class_transformer_1.instanceToPlain)(updatedTask);
                // return the updated task
                return res.json(updatedTask).status(200);
            }
            catch (error) {
                return res.json({ error: 'internal server error on update' }).status(500);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get the task ID from the request
                const taskId = req.body.id;
                // check if the task exists in the database
                const task = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({ where: { id: taskId } });
                if (!task) {
                    return res.json({ error: 'task not found' }).status(404);
                }
                // delete the task
                yield __1.AppDataSource.getRepository(tasks_entity_1.Task).delete(taskId);
                // return a success response
                return res.json({ message: 'task deleted successfully' }).status(200);
            }
            catch (error) {
                return res.json({ error: 'internal server error on delete' }).status(500);
            }
        });
    }
}
exports.taskController = new TaskController();
