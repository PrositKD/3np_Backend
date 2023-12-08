import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from '../signUp/seller.entity';
import { LoginDTO } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepository: Repository<SellerEntity>,
  ) {}
 async login(data: LoginDTO) {

    if(await this.sellerRepository.count({where: {email: data.username}})==0){

      return { message: 'there is no existing account using this email.Please sign up fist.' };
     }
     const tableData1= await this.sellerRepository.findOneBy({email: data.username})
     const passwordMatches = await bcrypt.compare(data.password, tableData1.password);

    if (passwordMatches) {
        return { message: 'Password matched'};
    } else {
        return { message: 'Password did not match' };
    }
  
}

}
