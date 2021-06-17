import { createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/database/typeorm/migrations/**/*.ts'],
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
