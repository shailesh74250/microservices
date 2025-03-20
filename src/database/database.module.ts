import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig())],
  exports: [TypeOrmModule], // Export to use in other modules
})
export class DatabaseModule {}