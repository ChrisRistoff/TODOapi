import express, {
  Express,
  //Request,
  //Response
} from 'express';

import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import cors from 'cors';
import bodyParser from 'body-parser';

import { Task } from './src/tasks/tasks-entity';

import { tasksRouter } from './src/tasks/tasks-router';

// instantiate express
const app: Express = express();
dotenv.config();


// parse request body
// bdoyParser will parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
app.use(bodyParser.json());


// enable cors
// cors will allow requests from any origin to access this API
app.use(cors());


// create database connection
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Task],
  });

// define a server port
const port = process.env.PORT;

AppDataSource.initialize()
// listen to incoming requests

  .then(() => {
  app.listen(port);
  console.log('Data Source initialized');
})

  .catch((err) => {
  console.error(
  "error during data source initialization", 
  err
  );
});

// routes 
app.use('/', tasksRouter);
