import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const swegerConfig = new DocumentBuilder()
    .setTitle('Artist API')
    .setDescription('Coolest API for Artist')
    .setVersion('1.0')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, swegerConfig);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(config.get('port'));
}
bootstrap();
