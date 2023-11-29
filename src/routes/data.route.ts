import express from 'express';

import { dataController } from 'controller';

const dataRouter = express.Router();

dataRouter.get('/store', dataController.storeDataHandler);

export { dataRouter };
