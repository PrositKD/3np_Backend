
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { sellerEntity } from '../DMSeller/seller.entity';

@Entity("Admin")
export class AdminEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'fullname',type: "varchar",length: 150})
name:string;
@Column({type: "varchar",length: 150})
email:string;
@Column()
phone:number;
@Column()
password:string;
@Column()
filenames:string;

@OneToMany(() => sellerEntity, seller => seller.admin)
 managers: sellerEntity[];


}

@Entity("AdminProfile")
export class AdminProfile{
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column({type: "varchar",length: 150})
photo:string;
}

@Entity("AdminAdress")
export class AdminAdress{
@PrimaryGeneratedColumn()
id:number;
@Column()
name:string;
@Column({type: "varchar",length: 150})
photo:string;
}



