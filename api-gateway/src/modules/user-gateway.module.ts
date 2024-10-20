import { Module } from '@nestjs/common';
import { UserGateway } from '../gateways';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('userQueue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${URL}`],
            queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [UserGateway],
})
export class UserGatewayModule {}
