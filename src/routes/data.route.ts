import express from 'express';

import { dataController } from 'controller';

const dataRouter = express.Router();

dataRouter.post(
  '/store',
  dataController.storeDataValidator(),
  dataController.storeData,
);
dataRouter.post(
  '/retrieve',
  dataController.retrieveDataValidator(),
  dataController.retrieveData,
);

export { dataRouter };
