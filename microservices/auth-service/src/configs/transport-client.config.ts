import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

export const userClientProvider = {
  provide: 'USER_SERVICE',
  useFactory: (configService: ConfigService) => {
    const URL = configService.get('rabbitmq_url');
    const queue = configService.get('userQueue');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],   
        queue: process.env.RABBITMQ_USER_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};

export const mailClientProvider = {
  provide: 'MAILER_SERVICE',
  useFactory: (configService: ConfigService) => {
    const URL = configService.get('rabbitmq_url');
    const queue = configService.get('mailerQueue');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: process.env.RABBITMQ_MAILER_QUEUE,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
