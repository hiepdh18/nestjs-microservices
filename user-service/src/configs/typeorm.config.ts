import { POSTGRES } from './../common/constant/envConstants';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: parseInt(POSTGRES.PORT),
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DB,
  entities: [join(__dirname, '/../**/**.entity.{ts,js}')],
  synchronize: true,
  migrations: ['/src/db/migrations/*.ts'],
  subscribers: ['/src/db/subscriber/*.ts'],
};

export default config;
