import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AdminAdress, AdminEntity, AdminProfile } from "./admin.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { sellerEntity } from "../Delivary_man/DMSeller/seller.entity";
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
    imports: [ TypeOrmModule.forFeature([AdminEntity, AdminProfile, AdminAdress,sellerEntity]),
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
    controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}