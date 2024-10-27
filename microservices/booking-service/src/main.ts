import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { microserviceOptions } from './configs/microservice-connection.config';
// import { MongoClient } from 'mongodb';
const logger = new Logger('BookingMicroservice');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(microserviceOptions);
  app.startAllMicroservices();

  await app.listen(3003);
  console.log(`Application is running on: https://localhost:3003 booking-service`);

  // testConnection()
}

// async function testConnection() {
//   const uri = 'mongodb://host.docker.internal:27017/yacht';
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB successfully!');
//   } catch (error) {
//     console.error('Connection failed:', error);
//   } finally {
//     await client.close();
//   }
// }

bootstrap();
