import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './seller.entity';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PhotoEntity } from './profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellerEntity,PhotoEntity]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'gardenaid29@gmail.com',
          pass: 'rjwhlucthgnjwmbm',
        },
      },
    }),
  ], 
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
