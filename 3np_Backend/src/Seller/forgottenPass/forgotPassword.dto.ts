import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
