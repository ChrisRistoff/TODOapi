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
    // @ts-ignore
    getAll(req, res) {
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
}
exports.taskController = new TaskController();
