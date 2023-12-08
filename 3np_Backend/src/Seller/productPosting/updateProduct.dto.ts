import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDTO {
  @IsOptional()
  @IsNotEmpty()
  productName: string;

  @IsOptional()
  @IsNotEmpty()
  productDescription: string;
  photoPath: string;
  

}
