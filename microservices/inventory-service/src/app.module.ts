import { Module } from '@nestjs/common';
import { ConfigurationModule } from './configs/config.module';
import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [ConfigurationModule, DbModule, UtilsModule, InventoryModule],
})
export class AppModule {}
