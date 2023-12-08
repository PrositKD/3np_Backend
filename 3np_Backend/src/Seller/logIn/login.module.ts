import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { SessionModule } from 'nestjs-session';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from 'src/signUp/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerEntity]),
    SessionModule.forRoot({ session: { secret: 'secret-key' } }),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
