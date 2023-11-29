import express from 'express';

import { dataController } from 'controller';

const dataRouter = express.Router();

dataRouter.post('/store', dataController.storeDataHandler);
dataRouter.post('/retrieve', dataController.retrieveDataHandler);

export { dataRouter };
