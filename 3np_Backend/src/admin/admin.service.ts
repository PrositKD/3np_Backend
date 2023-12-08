import { Injectable } from "@nestjs/common";
import { AdminDTO, AdminUpdateDTO, LoginDTO, mailDTO } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { Repository } from "typeorm";
import { sellerEntity } from "../Delivary_man/DMSeller/seller.entity";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AdminService {
    getseller(adminid: number) {
        throw new Error("Method not implemented.");
    }
    addseller(seller: any) {
        throw new Error("Method not implemented.");
    }
    constructor(
        @InjectRepository(AdminEntity)
        private adminRepo: Repository<AdminEntity>,
        @InjectRepository(sellerEntity)
        private managerRepo: Repository<sellerEntity>,
        private mailerService: MailerService,
    ) { }
    async getIndex(): Promise<AdminEntity[]> {
        return this.adminRepo.find();
    }
    async getAdminById(id: number): Promise<AdminEntity> {
      
            return this.adminRepo.findOneBy({ id });
      
    }

    async getAdminbyIDAndName(id, name): Promise<AdminEntity> {
        return this.adminRepo.findOneBy({ id: id, name: name });
    }

    async addAdmin(data: AdminDTO): Promise<AdminEntity> {
        return this.adminRepo.save(data);
    }

    async updateAdmin(email:string,data: AdminUpdateDTO): Promise<AdminEntity> {
        await this.adminRepo.update({email:email}, data);
        return this.adminRepo.findOneBy({ id: data.id });
    }
    async updateAdminById(id: number, data: AdminDTO): Promise<AdminEntity> {
        await this.adminRepo.update(id, data);
        return this.adminRepo.findOneBy({ id });
    }

    async deleteUser(id: number): Promise<AdminEntity[]> {
        await this.adminRepo.delete(id);
        return this.adminRepo.find();
    }

    async addManager(manager): Promise<sellerEntity> {
        return this.managerRepo.save(manager);
    }

    async getAllManagers(): Promise<sellerEntity[]> {
        return this.managerRepo.find();
    }
    async getManagersByAdmin(adminid: number): Promise<AdminEntity[]> {
        return this.adminRepo.find({
            where: { id: adminid },
            relations: {
                managers: true,
            },
        });
    }

    async signup(data: AdminDTO): Promise<AdminEntity> {
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password,salt);
       return this.adminRepo.save(data);
    }
    async login(data: LoginDTO) {
    if(await this.adminRepo.count({where: {email: data.email}})==0){
    
          return false;
    
         }
    
    
         const tableData1= await this.adminRepo.findOneBy({email: data.email})
    
         return bcrypt.compare(data.password, tableData1.password)

}

   async getimagebyadminid(adminid:number) {
const mydata:AdminDTO =await this.adminRepo.findOneBy({ id:adminid});
console.log(mydata);
return  mydata.filenames;
    }
getManager(id):Promise<AdminEntity[]>
{
    return this.adminRepo.find({
        where:{id:id},
        relations: {
            managers: true,
        },
    });
} 
async sendmail(data: mailDTO): Promise<any> {


    await this.mailerService.sendMail({
    to: data.email,
    subject: 'mgs from admin',
    text: data.message,
    });
    
    
    
    return 'sent your email';
    }

}
