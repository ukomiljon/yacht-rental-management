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
        urls: ['amqp://rabbitmq:5672'],
        queue: 'user_queue',
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
        urls: [`amqp://${URL}`],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
  inject: [ConfigService],
};
