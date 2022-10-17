import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/user/entities/role.entity';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Role],
  // entities: ['src/**/*.entity.ts'],
  synchronize: false,
  // migrations: ['/src/db/migrations/*.ts'],
  // subscribers: ['/src/db/subscriber/*.ts'],
};

export default config;
