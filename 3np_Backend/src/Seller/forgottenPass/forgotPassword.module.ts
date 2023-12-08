import { Module } from '@nestjs/common';
import { ForgotPasswordController } from './forgotPassword.controller';
import { ForgotPasswordService } from './forgotPassword.service';

@Module({
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
