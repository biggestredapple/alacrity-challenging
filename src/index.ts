import 'dotenv/config';
import { MESSAGES } from 'consts';
import { backendSetup, AppDataSource } from 'setups';
import { Env, Logger } from 'utils';

const setupServer = async () => {
  // Initialize environments
  Env.init();

  try {
    await AppDataSource.initialize();
    Logger.info(MESSAGES.DATABASE.CONNECTION_SUCCESS);
  } catch (error: unknown) {
    Logger.info(MESSAGES.DATABASE.CONNECTION_FAILURE);
    Logger.error(error);

    process.exit(0);
  }

  try {
    await backendSetup();
  } catch (error: unknown) {
    Logger.info(MESSAGES.SERVER.STARTING_FAILURE);
    Logger.error(error);
  }
};

setupServer();
