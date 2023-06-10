"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidator = void 0;
const express_validator_1 = require("express-validator");
const Priority_1 = require("../enums/Priority");
const Status_1 = require("../enums/Status");
exports.createValidator = [
    (0, express_validator_1.body)('title')
        .not()
        .isEmpty() // not.isEmpty() checks if the value is not empty
        .withMessage('Title is required') // if the value is empty, return this message
        .trim() // remove whitespace
        .isString() // check if the value is a string
        .withMessage('Title must be a string'),
    (0, express_validator_1.body)('date')
        .not()
        .isEmpty()
        .withMessage('Date is required')
        .isString()
        .withMessage('Date must be a string'),
    (0, express_validator_1.body)('description')
        .trim()
        .isString()
        .withMessage('Description must be a string'),
    (0, express_validator_1.body)('priority')
        .trim()
        .isIn([Priority_1.Priority.low, Priority_1.Priority.medium, Priority_1.Priority.high])
        .withMessage('Priority must be low, medium or high'),
    (0, express_validator_1.body)('status')
        .trim()
        .isIn([Status_1.Status.todo, Status_1.Status.inProgress, Status_1.Status.completed])
        .withMessage('Status must be todo, inProgress or done'),
];
