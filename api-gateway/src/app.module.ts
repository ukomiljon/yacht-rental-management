import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayModule, UserGatewayModule } from './modules';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    UtilsModule,
    AuthGatewayModule,
    UserGatewayModule,
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq:5672'],  // Updated to use 'rabbitmq'
            queue: 'auth_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
})
export class AppModule { }
