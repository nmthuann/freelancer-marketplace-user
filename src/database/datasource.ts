import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/!(*base).entity.js'], ///**/!(*base).entity.js
  migrations: ['dist/**/migrations/*.js'], // //__dirname + '/**/migrations/*.js'
  logging: false,
  synchronize: false,
  migrationsRun: false,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
})
