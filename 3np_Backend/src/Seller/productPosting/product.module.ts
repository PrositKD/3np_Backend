import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { SellerEntity } from '../signUp/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, SellerEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
