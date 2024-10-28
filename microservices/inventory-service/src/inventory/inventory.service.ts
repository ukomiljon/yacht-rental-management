import { Injectable } from '@nestjs/common'; 
import { InventoryRepository } from 'src/db/repository/inventory.repository';
import { InventoryEntity } from 'src/db/entities/inventory.entity';
import { CreateInventoryDto, DeleteInventoryDto, GetInventoryDto, UpdateInventoryDto } from './dtos';
import { successResponse } from './interfaces/inventory-response.interface';


@Injectable()
export class InventoryService {
  constructor(
    private readonly inventoryRepository: InventoryRepository  
  ) { } 
 
  async getById(getInventoryDto: GetInventoryDto): Promise<InventoryEntity> {
    return await this.inventoryRepository.findById(getInventoryDto.id);
  }

  async getAll(): Promise<[InventoryEntity]> {
    return await this.inventoryRepository.findMany();
  }

  async create(
    createInventoryDto: CreateInventoryDto,
  ): Promise<InventoryEntity> {     
    return await this.inventoryRepository.createItem(createInventoryDto);
  }

  async update(
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<InventoryEntity> {
    return await this.inventoryRepository.updateItem(updateInventoryDto.id, updateInventoryDto);
  }

  async delete(
    deleteInventoryDto: DeleteInventoryDto,
  ): Promise<successResponse> {
    return await this.inventoryRepository.remove(deleteInventoryDto.id);
  }
}
