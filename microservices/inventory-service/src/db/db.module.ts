import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { InventoryRepository } from './repository/inventory.repository';
 
@Module({
  imports: [],
  providers: [PrismaService, InventoryRepository],
  exports: [InventoryRepository],
})
export class DbModule {}
