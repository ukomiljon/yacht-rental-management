import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthGateway } from '../gateways';
import { UtilsModule } from '../utils/utils.module';
import { ConfigurationModule } from 'src/configs/config.module';

@Module({
  imports: [UtilsModule, ConfigurationModule],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const URL = configService.get('rabbitmq_url');
        const queue = configService.get('authQueue');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls:[`amqp://${URL}`],
            queue,
            queueOptions: {
              durable: false,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthGateway],
})
export class AuthGatewayModule {}
