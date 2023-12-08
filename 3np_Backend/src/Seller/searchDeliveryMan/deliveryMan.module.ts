import { Module } from '@nestjs/common';
import { DeliveryManController } from './deliveryMan.controller';
import { DeliveryManService } from './deliveryMan.service';

@Module({
  controllers: [DeliveryManController],
  providers: [DeliveryManService],
})
export class DeliveryManModule {}
