import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../utils/errors.js';

export function validateRequestBody(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new ValidationError(error.details[0].message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}