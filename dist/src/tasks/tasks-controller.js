"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
class TaskController {
}
exports.TaskController = TaskController;
() => {
    // holds all tasks
    let allTasks;
    // fetch all tasks using the repository
    try {
        allTasks = yield this.taskRepository.find({
            order: {
                date: 'ASC',
            }
        });
    }
    catch (errors) {
        console.log(errors);
    }
};
