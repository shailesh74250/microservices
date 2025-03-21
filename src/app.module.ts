import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { swaggerConfig } from './config/swagger.config';
// import { databaseConfig } from './config/database.config';
// import { AuthController } from './modules/auth/api/auth.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    AuthModule, 
    UsersModule, 
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      load: [swaggerConfig, databaseConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
