import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';


export class SellerDTO {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z- ]+$/, { message: 'Invalid name format' })
  name: string;

  @IsNotEmpty()
  @Matches(/^\d{11}$/, { message: 'Invalid mobile number format' })
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  dateOfBirth: string;


  @IsNotEmpty()
  shopName: string;

  @IsNotEmpty()
  shopType: string;
  shopPhoto: File;


  @IsNotEmpty()
  shopAddress: string;
}
