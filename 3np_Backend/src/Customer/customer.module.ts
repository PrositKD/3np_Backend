import { Module } from '@nestjs/common';
import { customerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { customerController } from './customer.controller';
import { CustomerEntity } from './customer.entity';
import { CustomerDEntity } from './customerdetails.entity';
import { ProductEntity, SProductEntity } from 'src/Customer/product/product.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, CustomerDEntity, SProductEntity, ProductEntity]),

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
  providers: [customerService],
  controllers: [customerController],
})
export class customerModule {}
