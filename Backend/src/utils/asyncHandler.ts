import { type Request, type Response, type NextFunction } from "express";

const asyncHandler = (requestHandler: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }

}

export { asyncHandler }