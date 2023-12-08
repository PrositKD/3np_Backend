import { IsNotEmpty, IsEmail } from 'class-validator';

export class SellerUpdateDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  shopName: string;

  @IsNotEmpty()
  shopType: string;

  @IsNotEmpty()
  shopAddress: string;
}
