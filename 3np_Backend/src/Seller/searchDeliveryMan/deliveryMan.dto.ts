import { IsNotEmpty, IsString } from 'class-validator';

export class DeliveryManDTO {
  @IsNotEmpty()
  @IsString()
  location: string;
}
