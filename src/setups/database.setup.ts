import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Env } from 'utils';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: Env.getEnvironmentVariable('DB_HOST'),
  username: Env.getEnvironmentVariable('DB_USERNAME'),
  password: Env.getEnvironmentVariable('DB_PASSWORD'),
  port: Number(Env.getEnvironmentVariable('DB_PORT')),
  database: Env.getEnvironmentVariable('DB_DATABASE'),
  logging: false,
  synchronize: true,
  entities: ['src/entities/*.entity{.ts,.js}'],
  entitySkipConstructor: true,
  namingStrategy: new SnakeNamingStrategy(),
});
