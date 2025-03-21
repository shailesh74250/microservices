import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../config/database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig], // Ensure the database config is loaded
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        const dbConfig = configService.get<TypeOrmModuleOptions>('database');

        if (!dbConfig) {
          throw new Error('Database configuration is missing! Check your .env file and config files.');
        }

        return dbConfig; // Now it's guaranteed to be defined
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
