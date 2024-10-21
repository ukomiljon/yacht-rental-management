import { APP_GUARD } from '@nestjs/core';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthGuard } from './guards';
import { HealthModule } from './health/health.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';
import {
  AuthGatewayModule,
  UserGatewayModule,
  // BookingGatewayModule,
  // PaymentGatewayModule,
} from './modules';

@Module({
  imports: [
    AuthGatewayModule,
    UserGatewayModule,
    // BookingGatewayModule,
    // PaymentGatewayModule,
    ConfigurationModule,
    UtilsModule,
    HealthModule,
  ],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  //   },
  //   {
  //     provide: 'AUTH_SERVICE',
  //     useFactory: (configService: ConfigService) => {
  //       const URL = configService.get('rabbitmq_url');
  //       const queue = configService.get('authQueue');

  //       return ClientProxyFactory.create({
  //         transport: Transport.RMQ,
  //         options: {
  //           urls: [`amqp://${URL}`],
  //           queue,
  //           queueOptions: {
  //             durable: true,
  //           },
  //         },
  //       });
  //     },
  //     inject: [ConfigService],
  //   },
  // ],
})
export class ApiGatewayModule {}


// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { AppController } from './app.controller';
 
// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: 'USER_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://rabbitmq:5672'],  // Updated to use 'rabbitmq'
//           queue: 'user_queue',
//           queueOptions: {
//             durable: false,
//           }, 
//         },
//       },
//       {
//         name: 'AUTH_SERVICE',
//         transport: Transport.RMQ,
//         options: {
//           urls: ['amqp://rabbitmq:5672'],  // Updated to use 'rabbitmq'
//           queue: 'auth_queue',
//           queueOptions: {
//             durable: false,
//           }, 
//         },
//       },
//     ]),
//   ],
//   controllers: [AppController],
// })
// export class AppModule {}
