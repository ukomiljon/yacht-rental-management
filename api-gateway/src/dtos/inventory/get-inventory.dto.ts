import { IsString } from "class-validator"; 
 
export class GetInventoryDto {
  @IsString()
  id: string; 
}
