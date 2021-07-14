import { Connection, createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const connection = async (): Promise<Connection> => {
  return createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['src/shared/infra/database/typeorm/migrations/**/*.ts'],
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
};

export default connection;
