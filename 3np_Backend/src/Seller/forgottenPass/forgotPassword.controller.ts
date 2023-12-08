import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ForgotPasswordDTO } from './forgotPassword.dto';
import { ForgotPasswordService } from './forgotPassword.service';

@Controller('forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('/')
  @UsePipes(new ValidationPipe())
  sendPasswordResetEmail(@Body() data: ForgotPasswordDTO): string {
    return this.forgotPasswordService.sendPasswordResetEmail(data);
  }
}
