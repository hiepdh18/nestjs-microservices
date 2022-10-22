import * as dotenv from 'dotenv';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '/../**/**.entity.{ts,js}')],
  synchronize: true,
  migrations: ['/src/db/migrations/*.ts'],
  subscribers: ['/src/db/subscriber/*.ts'],
};

export default config;
