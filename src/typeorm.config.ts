import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import entities from './users';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'postgres',
  entities: entities,
  synchronize: true,
};