import { Request, Response } from 'express';
import { AppDataSource } from '../..';
import { Task } from './tasks-entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

class TaskController {

  public async getAll(_: Request, res: Response): Promise<Response> {
    try {

      // get all tasks from the database await this.taskRepository.find();
      let allTasks: Task[] = await AppDataSource.getRepository(Task).find({
        order: {
          date: 'ASC',
        },
      });
      // convert the tasks to plain objects
      allTasks = instanceToPlain(allTasks) as Task[];

      return res.json(allTasks).status(200);

    } catch (error) {
      return res.json({ error : 'internal server error' }).status(500);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
 
  // check if there are any validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {

    // return the validation errors
    return res.status(400).json({ errors: errors.array() });
 
    }

  // create a new task instance
  const newTask: Task = new Task();

  // set the task's properties
  newTask.title = req.body.title;
  newTask.date = req.body.date;
  newTask.description = req.body.description;
  newTask.status = req.body.status;
  newTask.priority = req.body.priority;

  // save the task to the database
  try {
    let savedTask: Task = await AppDataSource.getRepository(Task).save(newTask);

    // convert the task to a plain object
    savedTask = instanceToPlain(savedTask) as Task;

    // return the newly created task
    return res.json(savedTask).status(201);
  } catch (error) {
    return res.json({ error : 'internal server error' }).status(500);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    // check if there are any validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

      // return the validation errors
      return res.status(400).json({ errors: errors.array() });

    }

    let task : Task | null;

    // get the task from the database by id
    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id },
      });

    } catch (error) {
      return res.json({ error : 'internal server error' }).status(500);
    }

    if (!task) {
      return res.json({ error : 'task not found' }).status(404);
    }

    // update the task's properties
    task.status = req.body.status;
    task.priority = req.body.priority;

    // variable that will hold the updated task
    let updatedTask: UpdateResult;

    // update the task
    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        // plainToInstance converts the plain object to an instance of the Task class
        // this is necessary because the update method expects an instance of the Task class
        task.id, plainToInstance(Task, {
          status: req.body.status,
          priority: req.body.priority}));

      // convert the updated task to a plain object
      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      // return the updated task
      return res.json(updatedTask).status(200);

    } catch (error) {
      return res.json({ error : 'internal server error on update' }).status(500);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      // get the task ID from the request
      const taskId: string = req.body.id;

      // check if the task exists in the database
      const task: Task | null = await AppDataSource.getRepository(Task).findOne(
        { where: { id: taskId } }
      );

      if (!task) {
        return res.json({ error : 'task not found' }).status(404);
      }

      // delete the task
      await AppDataSource.getRepository(Task).delete(taskId);

      // return a success response
      return res.json({ message: 'task deleted successfully' }).status(200);

    } catch (error) {
      return res.json({ error : 'internal server error on delete' }).status(500);
    }
  }
}

export const taskController = new TaskController();
