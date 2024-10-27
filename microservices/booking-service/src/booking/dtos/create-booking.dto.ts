import { IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  customer_id: string;

  @IsString()
  inventory_id: string;
}
