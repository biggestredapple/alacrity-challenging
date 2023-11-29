import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import routes from 'routes';

import { Logger, Env } from 'utils';
import { MESSAGES } from 'consts';
import { ROUTE_VERSION } from 'config';
import { routeMiddleware } from 'middlewares';

export const backendSetup = () => {
  const app: Express = express();

  // middlewares
  app.use(cors());
  app.use(express.json());
  app.use(routeMiddleware);

  // health check
  app.use('/health', (_req: Request, res: Response) => res.send('OK'));

  // routes
  app.use(`/api/${ROUTE_VERSION}/`, routes);

  app.listen(Env.getEnvironmentVariable('PORT'), () => {
    Logger.info(MESSAGES.SERVER.STARTING_SUCCESS);
  });
};
