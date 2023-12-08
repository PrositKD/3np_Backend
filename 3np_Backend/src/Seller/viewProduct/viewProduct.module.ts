import { Module } from '@nestjs/common';
import { ViewProductController } from './viewProduct.controller';
import { ViewProductService } from './viewProduct.service';

@Module({
  controllers: [ViewProductController],
  providers: [ViewProductService],
})
export class ViewProductModule {}
