import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  username: string;

  @IsNotEmpty()
  password: string;
}
