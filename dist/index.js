"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const tasks_entity_1 = require("./src/tasks/tasks-entity");
const tasks_router_1 = require("./src/tasks/tasks-router");
// instantiate express
const app = (0, express_1.default)();
dotenv_1.default.config();
// parse request body
// bdoyParser will parse incoming request bodies in a middleware before your handlers,
// available under the req.body property.
app.use(body_parser_1.default.json());
// enable cors
// cors will allow requests from any origin to access this API
app.use((0, cors_1.default)());
// create database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [tasks_entity_1.Task],
});
// define a server port
const port = process.env.PORT;
exports.AppDataSource.initialize()
    // listen to incoming requests
    .then(() => {
    app.listen(port);
    console.log('Data Source initialized');
})
    .catch((err) => {
    console.error("error during data source initialization", err);
});
// routes 
app.use('/', tasks_router_1.tasksRouter);
