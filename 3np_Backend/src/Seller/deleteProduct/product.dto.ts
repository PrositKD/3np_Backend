import { IsNotEmpty } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  productId: string;
}