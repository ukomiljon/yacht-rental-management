import { IsOptional, IsPositive, IsNumber, IsString } from 'class-validator';

export class UpdateInventoryDto {

  @IsString()
  id: string; 

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;
}
