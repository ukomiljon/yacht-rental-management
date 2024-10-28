import { IConfig } from './interfaces';

export function config(): IConfig {
  return {    
    inventoryQueue: process.env.RABBITMQ_INVENTORY_QUEUE,
  };
}
