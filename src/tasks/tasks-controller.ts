import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../..';
import { Task } from './tasks-entity';
import { instanceToPlain } from 'class-transformer';

export class TaskController {
  private taskRepository: Repository<Task>;

  constructor() {
    // get the task repository from the data source
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  // @ts-ignore
  public async getAll(req: Request, res: Response): Promise<Task[]> {
    try {

      // get all tasks from the database await this.taskRepository.find();
      let allTasks: Task[] = await this.taskRepository.find({
        order: {
          date: 'ASC',
        },
      });
      // convert the tasks to plain objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return allTasks;

    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');

      // return an empty array if there is an error
      return [];
    }
  }
}

