import { Module } from '@nestjs/common';
import { ClientProxyFactory, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthGatewayModule, UserGatewayModule } from './modules';
import { UtilsModule } from './utils/utils.module';
import { HealthModule } from './health/health.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards';
import { ConfigModule } from '@nestjs/config';
import { BookingGatewayModule } from './modules/booking-gateway.module';
import { PaymentGatewayModule } from './modules/payment-gateway.module';

@Module({
  imports: [
    UtilsModule,
    AuthGatewayModule,
    UserGatewayModule,
    BookingGatewayModule,
    PaymentGatewayModule,
    HealthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'AUTH_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL], 
            queue: process.env.RABBITMQ_AUTH_QUEUE,
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
