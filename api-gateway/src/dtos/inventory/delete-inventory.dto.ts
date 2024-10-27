import { IsString } from 'class-validator';
 
export class DeleteInventoryDto {
  @IsString()
  id: string; 
}
