import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

export const validateRequest =
  (Schema: AnyZodObject | ZodEffects<AnyZodObject>): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        session: req.cookies,
      });
      return next();
    } catch (error) {
      next(error);
    }
  };
