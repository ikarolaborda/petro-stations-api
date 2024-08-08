import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const commonConfig: Partial<TypeOrmModuleOptions> = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
};

const ormconfig: TypeOrmModuleOptions = {
  ...commonConfig,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.DATABASE_NAME_TEST
      : process.env.DATABASE_NAME,
  type: 'postgres',
};

export default ormconfig;
