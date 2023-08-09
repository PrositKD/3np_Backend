import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DelivaryEntity } from "./delivary.entity";

@Entity("Delivary_Details")
export class DelivaryDEntity{

    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"name",type:"varchar",length:50})
    name:string;
    @Column({name:"photo",type:"varchar",length:150 })
    photo:string;
    @Column({type:"varchar",length:20})
    phone:number;

    @Column({type:"varchar",length:20})
    vechile: string;
    @Column({type:"integer"})
    tk: number;
  
    @Column({type:"varchar",length:100})
    address: string;
    @Column({type:"varchar",length:20})
    gender: string;
    @OneToOne(() => DelivaryEntity, delivaryEntity => delivaryEntity.delivaryDEntity,{ cascade: true })
    @JoinColumn()
    delivary: DelivaryEntity;
 }
 