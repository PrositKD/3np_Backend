import { Module } from "@nestjs/common";
import { DelivaryController } from "./delivary.controller";
import { DelivaryService } from "./delivary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DelivaryEntity } from "./delivary.entity";
import { SellerEntity } from "src/DMSeller/Orders.entity";
import { DelivaryDEntity } from "./delivaryD.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
  imports: [
    TypeOrmModule.forFeature([DelivaryEntity, SellerEntity, DelivaryDEntity]),
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
  controllers: [DelivaryController],
  providers: [DelivaryService],
})
export class DelivaryModule {}
