import { Module } from '@nestjs/common';
import { SellerUpdateController } from './seller-update.controller';
import { SellerUpdateService } from './seller-update.service';

@Module({
  controllers: [SellerUpdateController],
  providers: [SellerUpdateService],
})
export class updateSellerModule {}
