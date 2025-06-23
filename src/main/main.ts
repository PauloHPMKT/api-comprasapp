import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main.ts');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(3000).then(() => {
    logger.log('[API COMPRASAPP] is running on: http://localhost:3000');
  });
}
bootstrap();
