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
exports.TaskController = void 0;
const __1 = require("../..");
const tasks_entity_1 = require("./tasks-entity");
const class_transformer_1 = require("class-transformer");
class TaskController {
    constructor() {
        // get the task repository from the data source
        this.taskRepository = __1.AppDataSource.getRepository(tasks_entity_1.Task);
    }
    // @ts-ignore
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // get all tasks from the database await this.taskRepository.find();
                let allTasks = yield this.taskRepository.find({
                    order: {
                        date: 'ASC',
                    },
                });
                // convert the tasks to plain objects
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return allTasks;
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Internal Server Error');
                // return an empty array if there is an error
                return [];
            }
        });
    }
}
exports.TaskController = TaskController;
