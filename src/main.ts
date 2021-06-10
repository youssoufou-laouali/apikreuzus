import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Evénements')
    .setDescription('Une API destinée à gérer les évenements ')
    .setVersion('1.0')
    .addTag('Evénement')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('kreezus', app, document);

  await app.listen(3000);
}
bootstrap();
