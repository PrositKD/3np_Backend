import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './Orders.entity';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { DelivaryEntity } from 'src/Delivary_man/delivary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity, DelivaryEntity])],
  providers: [SellerService],
  controllers: [SellerController],
})
export class SellerModule {}
