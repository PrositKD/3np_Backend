import { DelivaryEntity } from '../delivary.entity';
// import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

// import { DelivaryEntity } from "src/Delivary_man/delivary.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Orders")
export class SellerEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'Seller',type: "varchar",length: 150})
Seller:string;
@Column({name:'Receiver',type: "varchar",length: 150})
Receiver:string;
@Column({type: "varchar",length: 150})
Product:string;
@Column({type: "varchar",length: 150})
Time:Date;
@Column({type: "varchar",length: 150})
Address:string;
@Column({type: "varchar",length: 150})
Area:string;

@Column()
phone:number;
@Column({type: "varchar",length: 150})
Status:string;


 @ManyToOne(() => DelivaryEntity, delivaryEntity => delivaryEntity.Orders)
 Delivary_man: DelivaryEntity;
}
// @Entity("Orders")
// export class OrdersEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ type: "varchar", length: 150 })
//   orderName: string;

//   // Other columns of the OrdersEntity...

//   @ManyToOne(() => DelivaryEntity, delivary => delivary.orders)
//   delivary: DelivaryEntity;
// }
