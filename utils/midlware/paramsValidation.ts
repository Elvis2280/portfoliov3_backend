import { NextFunction, Request, Response } from 'express';
const yup = require('yup');
const validate =
  (schema: typeof yup) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(
        {
          body: req.body,
          query: req.query,
          params: req.params,
        },
        { strict: true },
      );
      return next();
    } catch (error: any) {
      return res.status(400).json({ type: error.name, message: error.message });
    }
  };

export default validate;
