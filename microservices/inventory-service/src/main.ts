import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceOptions } from './configs/microservice-connection.config';

const logger = new Logger('InventoryMicroservice');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(3006);

  logger.log(`Application is running on: https://localhost:3006 inventory-service`);
}
bootstrap();
