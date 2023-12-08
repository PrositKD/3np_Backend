import { Module } from '@nestjs/common';
import { DelivaryModule } from './Delivary_man/delivary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from './Seller/app.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [DelivaryModule,SellerModule,AdminModule,TypeOrmModule.forRoot(
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
