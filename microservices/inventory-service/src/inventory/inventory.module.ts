import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { UtilsModule } from '../utils/utils.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [UtilsModule, DbModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
