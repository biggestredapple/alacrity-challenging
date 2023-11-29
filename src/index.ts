import { MESSAGES } from 'consts';
import { backendSetup } from 'setups';
import { Env, Logger } from 'utils';

const setupServer = async () => {
  // Initialize environments
  Env.init();

  try {
    await backendSetup();
  } catch (error: unknown) {
    Logger.info(MESSAGES.SERVER.STARTING_FAILURE);
    Logger.error(error);
  }
};

setupServer();
