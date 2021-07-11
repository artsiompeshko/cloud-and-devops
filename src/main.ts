import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { config as envConfig } from 'dotenv';

function loadEnvVariables() {
  envConfig();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  app.enableCors();

  await app.listen(process.env.APP_PORT || 3000);

  console.info(`Hosting the app on ${process.env.APP_PORT || 3000} port`);
}

loadEnvVariables();
bootstrap();
