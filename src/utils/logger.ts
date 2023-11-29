import path from 'path';
import { Logger as DefaultLogger } from 'logger';

import { Env } from './env.handler';

type DescriptionInfo = {
  description: string;
  info: unknown;
};

type GroupLog = {
  title: string;
  descriptions: DescriptionInfo[];
};

class ServerLogger {
  private fileLogger: DefaultLogger;

  constructor() {
    const loggerFilePath = path.join(__dirname, '../../logs/server.log');
    this.fileLogger = new DefaultLogger(loggerFilePath);
  }

  private log(...descriptions: unknown[]) {
    if (Env.isProduction()) {
      this.fileLogger.log('info', ...descriptions);
    } else {
      console.log(...descriptions);
    }
  }

  info(description: unknown) {
    if (Env.isProduction()) {
      this.fileLogger.info(description);
    } else {
      console.info(description);
    }
  }

  error(description: unknown) {
    if (Env.isProduction()) {
      this.fileLogger.error(description);
    } else {
      console.error(description);
    }
  }

  fatal(description: unknown) {
    if (Env.isProduction()) {
      this.fileLogger.fatal(description);
    } else {
      console.error(description);
    }
  }

  group(groupDescription: GroupLog) {
    this.info(`/---------- ${groupDescription.title} ----------/`);
    groupDescription.descriptions.forEach((description: DescriptionInfo) => {
      this.log('\t', description.description, ':', description.info);
    });
    this.info('/---------- End ----------/');
  }
}

export { GroupLog };

export const Logger = new ServerLogger();
