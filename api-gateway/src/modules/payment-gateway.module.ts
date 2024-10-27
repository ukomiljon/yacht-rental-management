import { Module } from '@nestjs/common';
import { PaymentGateway } from '../gateways';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'PAYMENT_SERVICE',
      useFactory: () => {
      
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_PAYMENT_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      }
    },
  ],
  controllers: [PaymentGateway],
})
export class PaymentGatewayModule {}
