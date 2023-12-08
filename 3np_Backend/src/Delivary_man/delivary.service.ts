import { Injectable, NotFoundException, UploadedFile } from "@nestjs/common";
import { DelivaryDto, LoginDTO, statusDTO, updateProfileDTO } from "./delivary.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { DelivaryController } from "./delivary.controller";

import { Connection, In, Like, Repository } from "typeorm";
import { SellerEntity } from "src/Delivary_man/DMSeller/Orders.entity";
import { promises } from "dns";
import * as bcrypt from 'bcrypt';
import { DelivaryDEntity } from "./delivaryD.entity";
import { DelivaryEntity } from "./delivary.entity";
import { MailerService } from "@nestjs-modules/mailer/dist";
import session from "express-session";






@Injectable()
export class DelivaryService{
constructor(
    @InjectRepository(DelivaryEntity)
    private delivaryRepo:Repository<DelivaryEntity>,
    @InjectRepository(DelivaryDEntity)
    private readonly delivaryDetailsRepository: Repository<DelivaryDEntity>,
    @InjectRepository(SellerEntity) private orderRepository: Repository<SellerEntity>,
    private mailerService: MailerService,
    private readonly connection: Connection,
   
    ){}
    
    getIndex(): string{
        return "Hellow Delivary Man"
    }
    async getDelivaryById(email: string):Promise<any>{
    
    
        const profile = await this.delivaryRepo.findOne({ where: { email:email } });
        return profile;
    }
    async findByEmail(email: string): Promise<DelivaryEntity> {
      const delivary = await this.delivaryRepo
        .createQueryBuilder("delivary")
        .leftJoinAndSelect("delivary.delivaryDEntity", "delivaryDEntity")
        .where("delivary.email = :email", { email })
        .getOne();
  
      if (!delivary) {
        throw new NotFoundException(`Delivary with email ${email} not found.`);
      }
      return delivary;
    }
  
  
 
  
  //  async addDelivary(data: DelivaryDto): Promise<DelivaryEntity>
  //   { const salt = await bcrypt.genSalt();
  //     data.password = await bcrypt.hash(data.password,salt);
  //       return this.delivaryRepo.save(data);
  //   }
  // async signup11(delivaryDto: DelivaryDto): Promise<[DelivaryEntity,DelivaryDEntity]> {
  //   const delivary = new DelivaryEntity();
  //   const delivaryDetails = new DelivaryDEntity();
  //   delivary.email = delivaryDto.email;
  //   delivary.password = delivaryDto.password;

    
  //   delivaryDetails.name = delivaryDto.name;
  //   delivaryDetails.photo = delivaryDto.photo;
  //   delivaryDetails.phone = delivaryDto.phone;
  //   delivaryDetails.vechile = delivaryDto.vechile;
  //   delivaryDetails.tk = delivaryDto.tk;
  //   delivaryDetails.address = delivaryDto.address;

  //   const savedDelivary = await this.delivaryDetailsRepository.save(delivaryDetails);

  //   const savedDelivaryD =  await this.delivaryRepo.save(delivary);

  //   return [savedDelivary, savedDelivaryD];
  // }
  async signup(delivaryDto: DelivaryDto): Promise<[DelivaryEntity,DelivaryDEntity]> {
    
    const profile = await this.delivaryRepo.findOne({ where: { email:delivaryDto.email } });
   
if (profile !== null) {
  //return {s: 'Invalid login'}
  throw new NotFoundException(`Your id with email ${profile.email} already have account`);
    }   
    const delivary = new DelivaryEntity();

    const delivaryDetails = new DelivaryDEntity();

      const salt = await bcrypt.genSalt();

     delivary.password = await bcrypt.hash(delivaryDto.password,salt);

    delivary.email = delivaryDto.email;
   

    
    delivaryDetails.name = delivaryDto.name;
    delivaryDetails.photo = delivaryDto.photo;
    delivaryDetails.phone = delivaryDto.phone;
    delivaryDetails.vechile = delivaryDto.vechile;
    delivaryDetails.tk = delivaryDto.tk;
    delivaryDetails.address = delivaryDto.address;
    delivaryDetails.gender = delivaryDto.gender;
    const savedCustomer = await this.delivaryRepo.save(delivary);
    const delivary1 = await this.delivaryRepo.findOne({ where: { email: delivaryDto.email } });
    delivaryDetails.delivary = delivary1;
  const savedCustomerDetails = await this.delivaryDetailsRepository.save(delivaryDetails);

  return [savedCustomer, savedCustomerDetails];

//    return this.customerRepository.save(customer);

//     return this.customerDRepository.save(customerdetails);

  }

   async login(data: LoginDTO) {
    
 

    if(await this.delivaryRepo.count({where: {email: data.email}})==0){

      return false;

     }

     const tableData1= await this.delivaryRepo.findOneBy({email: data.email})

     return bcrypt.compare(data.password, tableData1.password)

  // if(await this.empRepo.count({where: {email: loginDTO.email}})==0){

  //     return false;

  //    }

  //    const tableData= await this.empRepo.findOneBy({email: loginDTO.email})

  //    return bcrypt.compare(loginDTO.password, tableData.password)

      // if(await this.empRepo.count({where: {email: loginDTO.email}})==0)

      // {

      // throw new UnauthorizedException;

      // }

      // const tableData= await this.empRepo.findOneBy({email: loginDTO.email})

      // if(!bcrypt.compare(loginDTO.password, tableData.password))

      // {

      //     throw new UnauthorizedException;

      // }

      // const payload = { usertype: "employee", email: loginDTO.email };

      // return {

      //     access_token: await this.jwtService.signAsync(payload),

      //     email: tableData.email,

      //     name: tableData.name,

      //     image: tableData.filename

      // };

  
  }

   

   async deleteDelivaryById(id: number):Promise<any>{
      
    const product = await this.orderRepository.findOne({ where: { id: id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    await this.orderRepository.remove(product);
    console.log(session)
    
   
  }


    async update(id: number, data: updateProfileDTO): Promise<DelivaryDEntity> {
      const delivaryDetails = await this.delivaryDetailsRepository.findOne({ where: { id:id } });

    if (!delivaryDetails) {
      throw new NotFoundException(`Delivary Details with ID ${id} not found.`);
    }

    delivaryDetails.name = data.name;
delivaryDetails.phone = data.phone;// Convert to number
delivaryDetails.vechile = data.vechile;
delivaryDetails.tk = parseInt(data.tk, 10); // Convert to number
delivaryDetails.address = data.address;

   // delivaryDetails.photo =imageobj.filename; ;

    return this.delivaryDetailsRepository.save(delivaryDetails);
  }
  
    
    


    async getOrderByLocation(location): Promise<SellerEntity[]> {
      location="%"+location+"%";
        return await this.orderRepository.find({ where: { Area: Like(location ),Status:"pending"} });
      }
   
     

    async getOrderByEmail(location): Promise<SellerEntity[]> {
    return await this.orderRepository.find({
      where: {
        Delivary_man: {
          email:location,
        },
        Status: "in-progress",
      },
      relations: ['Delivary_man'], // Load the related Delivary_man entity
    });
  }
  async getHistoryEmail(location): Promise<SellerEntity[]> {
    return await this.orderRepository.find({
      where: {
        Delivary_man: {
          email: location,
        },
        Status: In(["completed", "rejected"]), // Use In() to match multiple statuses
      },
      relations: ['Delivary_man'],
    });
  }

     /* async searchCustomer(search):Promise<any>{
        search="%"+search+"%";
        return await this.custRepo.find({
            where:
            [
                {name: Like(search)},
                {email: Like(search)},
                {phone: Like(search)},
                {address: Like(search)},
            ]
        }
            );
        // return await this.custRepo.find({where:{name: Like(search)}});
    }*/
   

    updateStatus(data: statusDTO): object {
        
        
    
        return ({id: 1,
            
            timestamp: new Date()});
      }

    getReviewsByDeliverymanId(deliverymanId: string): any {
       
        const reviews = [
          { id: 1, deliverymanId: '123', review: 'Great service!', rating: 5 },
          { id: 2, deliverymanId: '124', review: 'Prompt and reliable.', rating: 4 },
          { id: 3, deliverymanId: '456', review: 'Could improve delivery time.', rating: 3 },
        ];
    
        // Filter reviews based on the deliverymanId
        const filteredReviews = reviews.filter(review => review.deliverymanId === deliverymanId);
    
        // Return the filtered reviews or the appropriate response
        return filteredReviews;
      }
      async updatestatus(createSellerDto: statusDTO): Promise<SellerEntity> {
        const seller = new SellerEntity();
        seller.Seller = createSellerDto.Seller;
        seller.Receiver = createSellerDto.Receiver;
        seller.Product = createSellerDto.Product;
        seller.Time = createSellerDto.Time;
        seller.Address = createSellerDto.Address;
        seller.Area = createSellerDto.Area;
        
        seller.phone = createSellerDto.phone;
        seller.Status = createSellerDto.Status;
    const delivary = await this.delivaryRepo.findOne({ where: { email:createSellerDto.delivaryManEmail} });
    seller.Delivary_man = delivary;
    if (!delivary) {
      throw new NotFoundException('Delivery ID not found');
    }
    else{
    
        await this.orderRepository.update(createSellerDto.id, seller);
        return this.orderRepository.findOneBy({ id: createSellerDto.id });
}}
        async updatedelivaryId(id: number, data: statusDTO): Promise<SellerEntity> {
            await this.orderRepository.update(id, data);
            const delivary = await this.orderRepository.findOne({ where: { id:id } });
   if (!delivary) {
              throw new NotFoundException(`Product with ID ${id} not found.`);
            }   
   else if (delivary.Status=="completed") {
            await this.mailerService.sendMail({
              to: delivary.Seller, 
              subject: 'Delivary status', 
              text: `Your delivary is completed.Product name is: ${delivary.Product} and id is ${delivary.id}`, 
      });
     
  
    }
    else if (delivary.Status=="rejected") {
      await this.mailerService.sendMail({
        to: delivary.Seller, 
        subject: 'Delivary status', 
        text: `Your delivary is rejected by delivaryman.Product name is: ${delivary.Product} and id is ${delivary.id}`, 
});


}
   
            return this.orderRepository.findOneBy({ id});
        }
       
 async updated(id: number, data: updateProfileDTO): Promise<DelivaryDEntity> {
  const delivaryDetails = await this.delivaryDetailsRepository.findOne({ where: { id:id } });
    
        if (!delivaryDetails) {
          throw new NotFoundException(`Delivary Details with ID ${id} not found.`);
        }
        delivaryDetails.name = data.name;
        delivaryDetails.phone = data.phone; // Convert to number
        delivaryDetails.vechile = data.vechile;
        delivaryDetails.tk = parseInt(data.tk, 10); // Convert to number
        delivaryDetails.address = data.address;
        
       
        delivaryDetails.gender=data.gender;
       delivaryDetails.photo =data.photo; 
    
        await this.delivaryDetailsRepository.update(id,delivaryDetails);
        return this.delivaryDetailsRepository.findOneBy({ id});
      }
      async getProductById(Id: number): Promise<SellerEntity | undefined> {
        return await this.orderRepository.findOne({ where: { id:Id } });
      }
}

   
  