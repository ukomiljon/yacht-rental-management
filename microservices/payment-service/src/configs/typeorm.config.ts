import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PaymentEntity } from 'src/db/entities/payment.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    // const config = this.configService.get('mongodb_config');
    return {
      type: 'mongodb',
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      ssl: false,
      authMechanism: 'DEFAULT',
      authSource: 'admin',
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      useUnifiedTopology: true,
      database: process.env.MONGODB_DB,
      entities: [PaymentEntity], 
    }
     
  }
}
