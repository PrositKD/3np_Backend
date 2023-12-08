 import {  SellerEntity } from "../DMSeller/Orders.entity";
//import { OrdersEntity } from "src/Seller/Orders.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { DelivaryDEntity } from "./delivaryD.entity";

@Entity("Delivary_man")
export class DelivaryEntity{

    @PrimaryColumn()
    email:string;
    @Column({type:"varchar",length:100})
    password: string;
    
@OneToOne(() => DelivaryDEntity, delivaryDEntity => delivaryDEntity.delivary )

delivaryDEntity: DelivaryDEntity;
    // @OneToMany(() => OrdersEntity, orders => orders.delivary)
    // orders: OrdersEntity[];
 @OneToMany(() => SellerEntity, Orders => Orders.Delivary_man)
  Orders: SellerEntity[];
 }
