import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres', // `as const` is not needed here
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'test_db',
  entities: [`${__dirname}/../**/*.entity.{ts,js}`], // Corrected entity path
  migrations: [`${__dirname}/migrations/*.{ts,js}`], // Corrected migrations path
  synchronize: process.env.NODE_ENV === 'development', // Disable in production
  logging: process.env.NODE_ENV === 'development',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

// ✅ Export as NestJS config module
export default registerAs('database', () => databaseConfig);
