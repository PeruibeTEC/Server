require('dotenv').config();

module.exports = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/database/typeorm/migrations/**/*.ts'],
  subscribers: ['src/shared/infra/database/typeorm/subscribers/**/*.ts'],
  cli: {
    entitiesDir: './src/modules/**/infra/typeorm/entities/*.ts',
    migrationsDir: 'src/shared/infra/database/typeorm/migrations',
    subscribersDir: 'src/shared/infra/database/typeorm/subscribers',
  },
};
