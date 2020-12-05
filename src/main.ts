import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const mainPort = 3003

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.enableCors()
  await app.listen(mainPort);
}
bootstrap();
