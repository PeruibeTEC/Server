require('dotenv').config();

console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL)

if (process.env.DEV_ENVIRONMENT === 'true'){
  module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
  
    synchronize: true,
    logging: false,
    entities: ['src/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['src/shared/infra/database/typeorm/migrations/**/*.js'],
    subscribers: ['src/shared/infra/database/typeorm/subscribers/**/*.js'],
    cli: {
      entitiesDir: './src/modules/**/infra/typeorm/entities/*.js',
      migrationsDir: 'src/shared/infra/database/typeorm/migrations',
      subscribersDir: 'src/shared/infra/database/typeorm/subscribers',
    },
  };
} else {
  module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL,
  
    synchronize: true,
    logging: false,
    entities: ['dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['dist/shared/infra/database/typeorm/migrations/**/*.js'],
    subscribers: ['dist/shared/infra/database/typeorm/subscribers/**/*.js'],
    cli: {
      entitiesDir: './dist/modules/**/infra/typeorm/entities/*.js',
      migrationsDir: 'dist/shared/infra/database/typeorm/migrations',
      subscribersDir: 'dist/shared/infra/database/typeorm/subscribers',
    },
  };
}

