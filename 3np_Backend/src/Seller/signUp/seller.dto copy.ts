import { IsNotEmpty, IsEmail, MinLength, Matches, IsOptional } from 'class-validator';


export class SellerCDTO {
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
  shopPath: string;


  @IsNotEmpty()
  shopAddress: string;

  @IsNotEmpty()
  otp: string;
}
