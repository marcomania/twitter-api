import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';
import { appendFile } from 'fs';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    TweetsModule,
    UsersModule,
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {
  static port: number;
  constructor(private configService: ConfigService) {
    AppModule.port = +this.configService.get('BACKEND_PORT');
  }
}
