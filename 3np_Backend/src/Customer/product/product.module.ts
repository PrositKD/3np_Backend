import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SProductEntity } from "./product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";


@Module({
  imports: [TypeOrmModule.forFeature([SProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class CProductModule {}