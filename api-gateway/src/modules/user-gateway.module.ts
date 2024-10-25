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
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_USER_QUEUE,
                        queueOptions: {
                            durable: false,
                        },
                    },
                });
            },
        },
    ],
    controllers: [UserGateway],
})
export class UserGatewayModule { }
