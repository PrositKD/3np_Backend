import { Module } from '@nestjs/common';
import { DelivaryModule } from './Delivary_man/delivary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DMSellerModule } from './Delivary_man/DMSeller/app.module';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './Seller/signUp/seller.module';
import { LoginModule } from './Seller/logIn/login.module';
import { ProductModule } from './Seller/productPosting/product.module';
import { dProductModule } from './Seller/deleteProduct/product.module';
import { ViewProductModule } from './Seller/viewProduct/viewProduct.module';
import { DeliveryManModule } from './Seller/searchDeliveryMan/deliveryMan.module';
import { ForgotPasswordModule } from './Seller/forgottenPass/forgotPassword.module';
import { CProductModule } from './Customer/product/product.module';
import { customerModule } from './Customer/customer.module';


@Module({
  imports: [customerModule,CProductModule,DelivaryModule,DMSellerModule,AdminModule,SellerModule,
    LoginModule,
    ProductModule,
    dProductModule,
    ViewProductModule,
    DeliveryManModule,
    ForgotPasswordModule,TypeOrmModule.forRoot(
    { type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '445566',
    database: 'tri_gardening',//Change to your database name
    autoLoadEntities: true,
    synchronize: true,
    } ),],
  controllers: [],
  providers: [],
})
export class AppModule {}
