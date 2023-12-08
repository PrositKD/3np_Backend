import { Injectable } from '@nestjs/common';
import { ForgotPasswordDTO } from './forgotPassword.dto';

@Injectable()
export class ForgotPasswordService {
  sendPasswordResetEmail(data: ForgotPasswordDTO): string {
    return 'Password reset email sent successfully';
  }
}
