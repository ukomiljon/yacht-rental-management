import { Transport } from '@nestjs/microservices';

export const microserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL],   
    queue:process.env.RABBITMQ_AUTH_QUEUE,
    noAck: false,
    queueOptions: {
      durable: false,
    },
  },
};
