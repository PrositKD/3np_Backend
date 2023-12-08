import { IsNotEmpty, IsUUID } from 'class-validator';

export class ViewProductDTO {
  @IsNotEmpty()
  @IsUUID()
  sellerId: string;
}
