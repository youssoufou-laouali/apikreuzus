import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventModule } from './event/event.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [EventModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
