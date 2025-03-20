import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot(); // Load environment variables

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'test_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Load entities dynamically
  synchronize: process.env.DB_SYNC === 'true', // Enable only in development
  logging: process.env.DB_LOGGING === 'true', // Enable logging if required
});