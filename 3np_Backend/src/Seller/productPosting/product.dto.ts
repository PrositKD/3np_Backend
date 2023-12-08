import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDTO {
  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  productDescription: string;

  photoPath: string;

  @IsNotEmpty()
  sellerId: number;

}
