import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

const commonConfig: Partial<DataSourceOptions> = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

const ormconfig: DataSourceOptions[] = [
  {
    ...commonConfig,
    name: 'default',
    database: process.env.DATABASE_NAME!,
    migrationsRun: true,
    type: 'postgres',
  },
  {
    ...commonConfig,
    name: 'test',
    database: process.env.DATABASE_NAME_TEST!,
    type: 'postgres',
  },
];

export = ormconfig;
