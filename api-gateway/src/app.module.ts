import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
 
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],  // Updated to use 'rabbitmq'
          queue: 'user_queue',
          queueOptions: {
            durable: false,
          }, 
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],  // Updated to use 'rabbitmq'
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          }, 
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
