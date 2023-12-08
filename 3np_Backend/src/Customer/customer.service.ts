import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductDTO, customerdto, logindto, productDTO, updatedto } from "./customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity, SProductEntity } from "src/Customer/product/product.entity";
import { CustomerEntity } from "./customer.entity";
import * as bcrypt from 'bcrypt';
import { CustomerDEntity } from "./customerdetails.entity";
import { MailerService } from "@nestjs-modules/mailer";



  @Injectable()
export class customerService {
    private email: string;

    


  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(CustomerDEntity)
    private readonly customerDRepository: Repository<CustomerDEntity>,
    @InjectRepository(SProductEntity)
    private readonly sProductRepository: Repository<SProductEntity>,
    private readonly mailerService: MailerService,
  ) {}

  // Setter method to set the email value
  setEmail(email: string) {
    this.email = email;}



  async createProduct(data: ProductDTO, productPhoto: Express.Multer.File): Promise<ProductEntity> {
  
      const product = new ProductEntity();
  
      product.name = data.productName;
  
      product.description = data.productDescription;
  
      product.photoPath = productPhoto.filename;
  
      return await this.productRepository.save(product);
  
    }
  

    async getIndex(): Promise<string> {
        return "Hello Admin";
    }

    async getcustomerById(id: number): Promise<object> {
        return { id: 2, name: "abc", age: 30 };
    }

    async addcustomer(data: customerdto): Promise<object> {
        return data;
    }

    async signIn(data: logindto) {
        const userdata= await this.customerRepository.findOneBy({email:data.email});
    const match:boolean = await bcrypt.compare(data.password, userdata.password);
    return match;
    }

    // async login(data: { email: string; password: string }): Promise<string> {
    //     return "Login successful";
    // }

    async createProfile(data: customerdto): Promise<{message: string} > {
        const profile = await this.customerRepository.findOne({ where: { email:data.email } });
   
        if (profile !== null) {
              throw new NotFoundException(`Your id with email ${profile.email} already have account`);
            }
       
        const customer = new CustomerEntity();
        const customerdetails = new CustomerDEntity();
        
        customer.email = data.email;
        const salt = await bcrypt.genSalt();

        data.password = await bcrypt.hash(data.password,salt);
        customer.password = data.password;
        customerdetails.house = data.house;
        customerdetails.road = data.road;
        customerdetails.district = data.district;
        customerdetails.city = data.city;
        customerdetails.phoneNumber = data.phoneNumber;
        customerdetails.dateOfBirth = data.dateOfBirth;
        customerdetails.photo= data.myfile;
        customerdetails.firstName = data.firstName;
        customerdetails.lastName = data.lastName;
        const savedCustomer = await this.customerRepository.save(customer);


        const seller = await this.customerRepository.findOne({ where: { email: data.email } });

    customerdetails.customer = seller;
 
      const savedCustomerDetails = await this.customerDRepository.save(customerdetails);

      return {
        message: 'A 6 digit OTP has been sent to your email',
      };
     
      //return [savedCustomer, savedCustomerDetails];
    //    return this.customerRepository.save(customer);
    //     return this.customerDRepository.save(customerdetails);
      }
    

      async buyProduct(productId:productDTO): Promise<string> {
        const sProduct = await this.sProductRepository.findOne({where:{id: productId.productid}});
        
        if (!sProduct) {
          throw new NotFoundException('Product not found');
        }
      
        const { id, name, description, photoPath } = sProduct;
        const product = new ProductEntity();
        product.id=id;
        product.name=name;
        product.description=description;
        product.photoPath=photoPath;

        const seller = await this.customerRepository.findOne({where:{email: productId.email}});

        product.customer = seller;
        //   product.customer=this.email;
          await this.productRepository.save(product);

         
          console.log(seller.email);




          await this.mailerService.sendMail({
            to: seller.email,
            subject: 'Your Order Details',
            text: `Product ID: ${id}
          Product Name: ${name}
          Product Description: ${description}
          Product Photo Path: ${photoPath}`,
          });
      
        return "buy product and sent email success";
      }
      

    async search(productId: string): Promise<object> {
        return ;
    }

    async communicateWithSeller(orderId: string, message: string): Promise<string> {
        return "message";
    }

    async reviewProduct(productId: string, reviewData: any): Promise<string> {
        return "write here";
    }

    async makePayment(orderId: string, paymentData: any): Promise<string> {
        return paymentData;
    }

    async editProfile(data: customerdto): Promise<object> {
        return data;
    }

    async deleteAccount(id: number): Promise<any> {
        return this.productRepository.delete({ id});
    }
    async login(data):Promise<any>
    { 
       if(await this.customerRepository.count({where: {email: data.email}})==0){
        return false;
       }
       const tableData1= await this.customerRepository.findOneBy({email: data.email})
       return bcrypt.compare(data.password, tableData1.password)
    //    if(await this.empRepo.count({where: {email: loginDTO.email}})==0){
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
    async getOrderByid(id: number): Promise<ProductEntity[]> {
        return this.productRepository.find({ where: { id: id } });
      }

      async findAllProductsByEmail(email: string): Promise<ProductEntity[]> {
        return this.productRepository
          .createQueryBuilder('product')
          .innerJoin('product.customer', 'customer')
          .where('customer.email = :email', { email })
          .getMany();
      }

      async updateById(id: number, data: updatedto): Promise<CustomerDEntity> {
        await this.customerDRepository.update(id, data);
        return this.customerDRepository.findOneBy({ id});
    }

    async getCustomer(customerId: number): Promise<CustomerDEntity > {
      
        const customer = await this.customerDRepository.findOne({ where: {id: customerId } });
        return customer;
      
    
    }


    
    async veri(email:string): Promise<string> {
       
        return email;
    }



    async getAllSProducts(): Promise<SProductEntity[]> {
      return this.sProductRepository.find();
    }
}