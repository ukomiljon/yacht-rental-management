import { Controller } from '@nestjs/common';

import {
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { InventoryService } from './inventory.service';
import { CreateInventoryDto, DeleteInventoryDto, GetInventoryDto, UpdateInventoryDto } from './dtos';
import { InventoryEntity } from 'src/db/entities/inventory.entity';
import { successResponse } from './interfaces';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService
  ) { }

  @MessagePattern({ cmd: 'fetch-all-Inventory' })
  async getInventories(): Promise<[InventoryEntity]> {
    return this.inventoryService.getAll();
  }

  @MessagePattern({ cmd: 'get-inventory' })
  async getInventoryById(
    @Payload() getInventoryDto: GetInventoryDto
  ): Promise<InventoryEntity> {
    return this.inventoryService.getById(getInventoryDto);
  }

  @MessagePattern({ cmd: 'create-inventory' })
  async createInventory(
    @Payload() createInventoryDto: CreateInventoryDto
  ): Promise<InventoryEntity> {
    return this.inventoryService.create(createInventoryDto);
  }

  @MessagePattern({ cmd: 'update-inventory' })
  async updateInventory(
    @Payload() updateInventoryDto: UpdateInventoryDto
  ): Promise<InventoryEntity> {
    return this.inventoryService.update(updateInventoryDto);
  }

  @MessagePattern({ cmd: 'delete-inventory' })
  async deleteInventoryById(
    @Payload() deleteInventoryDto: DeleteInventoryDto
  ): Promise<successResponse> {
    return await this.inventoryService.delete(deleteInventoryDto);
  }

}
