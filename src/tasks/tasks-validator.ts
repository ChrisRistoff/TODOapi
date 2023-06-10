import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty() // not.isEmpty() checks if the value is not empty
    .withMessage('Title is required') // if the value is empty, return this message
    .trim() // remove whitespace
    .isString() // check if the value is a string
    .withMessage('Title must be a string'),

  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isString()
    .withMessage('Date must be a string'),

  body('description')
    .trim()
    .isString()
    .withMessage('Description must be a string'),
  
  body('priority')
    .trim()
    .isIn([Priority.low, Priority.medium, Priority.high])
    .withMessage('Priority must be low, medium or high'),

  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Status must be todo, inProgress or done'),
];
