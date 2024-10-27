import { IsDate, IsNumber, IsString } from 'class-validator';

export class PaymentModel {
  @IsString()
  id: number;

  @IsString()
  booking_id: string;

  @IsString()
  customer_id: string;

  @IsDate()
  created_at: Date;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsString()
  transaction_id: string;

  @IsString()
  transaction_status: string;
}
