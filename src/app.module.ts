import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { EventModule } from './event/event.module';

@Module({
  imports: [EventModule, MongooseModule.forRoot('mongodb+srv://issi:ZenabTataFara000@cluster0.8l1vf.mongodb.net/api?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
