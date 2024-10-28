import {
  IsDate,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';


export class InventoryEntity {
  id?: string;

  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;
}
