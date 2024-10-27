import { Module } from '@nestjs/common';
import { InventoryGateway } from '../gateways';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UtilsModule } from '../utils/utils.module';

@Module({
    imports: [UtilsModule],
    providers: [
        {
            provide: 'INVENTORY_SERVICE',
            useFactory: () => {
                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [process.env.RABBITMQ_URL],
                        queue: process.env.RABBITMQ_INVENTORY_QUEUE,
                        queueOptions: {
                            durable: false,
                        },
                    },
                });
            },
        },
    ],
    controllers: [InventoryGateway],
})
export class InventoryGatewayModule { }
