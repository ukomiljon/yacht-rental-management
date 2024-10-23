import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthGateway } from '../gateways';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://rabbitmq:5672'],   
            queue: 'auth_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      }, 
    },
  ],
  controllers: [AuthGateway],
})
export class AuthGatewayModule {}
