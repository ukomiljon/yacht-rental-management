import { Injectable } from '@nestjs/common';
import { IPaginationQuery } from '../interfaces';
import { Inventory, Inventory as InventoryModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BaseRepository } from '../base/base.abstract.repository';
import { hash } from 'bcrypt';
import { CreateInventoryDto, UpdateInventoryDto } from 'src/inventory/dtos';
import { successResponse } from 'src/inventory/interfaces';

@Injectable()
export class InventoryRepository extends BaseRepository<'inventory'> {
  constructor() {
    super(new PrismaService());
    this.model = 'inventory';
  }

  public omit(obj: any, ...props: any[]) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
  }

  public async getAll(params: IPaginationQuery) {
    const filteredParams = this.omit(params, 'page', 'perPage');

    const inventories = await this.findMany({
      where: filteredParams,
      skip: params.perPage * params.page - params.perPage,
      take: params.perPage,
    });

    return inventories;
  } 

  async createItem(data: CreateInventoryDto): Promise<Inventory> {
    return this.create({
      data,
    });
  }

  async findById(id: string): Promise<Inventory| null> {
    return this.findUnique({
      where: { id },
    });
  }

  async updateItem(id: string, data: UpdateInventoryDto): Promise<Inventory> {
    return this.update({
      where: { id },
      data,  
    });
  }

  async remove(id: string): Promise<successResponse> {
    return this.delete({
      where: { id },
    });
  }
}
