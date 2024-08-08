import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

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

const dataSourceOptions: DataSourceOptions = {
  ...commonConfig,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_NAME_TEST
      : process.env.DATABASE_NAME,
  type: 'postgres',
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
export { dataSourceOptions };
