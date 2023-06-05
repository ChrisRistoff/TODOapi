import { Repository } from "typeorm";
import { AppDataSource } from "../..";
import { Task } from "./tasks-entity";

export class TaskController{
  constructor(private taskRepository : Repository = AppDataSource.getRepository() {}
  

  public async getAll(): Promise<Task[]> {
    // holds all tasks
    let allTasks: Task[];

    // fetch all tasks using the repository
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: 'ASC',
      }});
    } catch (errors) {
        console.log(errors);
    }
  }
}
