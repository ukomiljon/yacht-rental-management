import {
  Body,
  Controller,
  Res,
  Inject,
  Query,
  Get,
  Patch,
  Param,
  Delete,
  Post,
} from '@nestjs/common';

import { Response } from 'express';
import { CommonService } from '../utils/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import {
  CreateInventoryDto,
  DeleteInventoryDto,
  GetInventoryDto,
  UpdateInventoryDto,
} from '../dtos/inventory';
import { IResponseInventory } from 'src/interfaces/inventory/response-inventory';

@Controller('api/v1/inventory')
export class InventoryGateway {
  constructor(
    @Inject('INVENTORY_SERVICE') private readonly inventoryService: ClientProxy,
    private readonly commonService: CommonService,
  ) { }


  @Post('/')
  public async CreateInventory(
    @Body() newInventory: CreateInventoryDto,
  ): Promise<IResponseInventory> {
    console.log("newInventory:", newInventory);
    return await this.commonService.sendEvent(
      this.inventoryService,
      { cmd: 'create-inventory' },
      { ...newInventory },
    );
  }

  @Get('/')
  public async GetAll(
    @Query() params: PaginationQueryDto,
  ): Promise<IResponseInventory[]> {
    return await this.commonService.sendEvent(
      this.inventoryService,
      { cmd: 'fetch-all-Inventory' },
      { ...params },
    );
  }

  @Get('/:id')
  public async GetInventory(@Param() params: GetInventoryDto): Promise<IResponseInventory> {
    return await this.commonService.sendEvent(
      this.inventoryService,
      { cmd: 'get-inventory' },
      { ...params },
    );
  }

  @Patch('/')
  public async UpdateInventory(
    @Body() dto: UpdateInventoryDto,
  ): Promise<IResponseInventory> {
    const updateOptions = dto;

    return await this.commonService.sendEvent(
      this.inventoryService,
      { cmd: 'update-inventory' },
      { updateOptions },
    );
  }

  @Delete('/')
  public async DeleteInventory(
    @Body() dto: DeleteInventoryDto,
    @Res() res: Response,
  ): Promise<void> {
    const deleteOptions = dto;

    return await this.commonService.sendEvent(
      this.inventoryService,
      { cmd: 'delete-inventory' },
      { deleteOptions, res },
    );
  }
}
