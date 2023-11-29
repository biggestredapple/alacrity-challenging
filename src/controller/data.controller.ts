import { Request, Response } from 'express';
import httpStatus from 'http-status';

export const storeDataHandler = async (_req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: 'success' });
};
