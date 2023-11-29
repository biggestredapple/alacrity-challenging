import express from 'express';

import { dataRouter } from './data.route';

const router = express.Router();

router.use('/data', dataRouter);

export default router;
