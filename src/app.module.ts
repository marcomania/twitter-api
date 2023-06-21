import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetsModule } from './modules/tweets/tweets.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TweetsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: "mmania2*M",
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {
  
}
