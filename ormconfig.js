require('dotenv').config();

console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL)

if (process.env.DEV_ENVIRONMENT === 'true'){
  module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  
    ssl: true,
    extra: {
      ssl: {
        "rejectUnauthorized": false
      }
    },

    synchronize: true,
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
} else {
  module.exports = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  
    ssl: true,
    extra: {
      ssl: {
        "rejectUnauthorized": false
      }
    },
    
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

