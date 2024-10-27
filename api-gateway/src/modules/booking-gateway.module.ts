import { Module } from '@nestjs/common';
import { BookingGateway } from '../gateways';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [
    {
      provide: 'BOOKING_SERVICE',
      useFactory: () => {
      
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: process.env.RABBITMQ_BOOKING_QUEUE,
            queueOptions: {
              durable: true,
            },
          },
        });
      } 
    },
  ],
  controllers: [BookingGateway],
})
export class BookingGatewayModule {}
