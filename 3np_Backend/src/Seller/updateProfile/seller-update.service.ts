import { Injectable } from '@nestjs/common';
import { SellerUpdateDTO } from './seller-update.dto';

@Injectable()
export class SellerUpdateService {
  updateSellerProfile(data: SellerUpdateDTO): string {
    return 'Seller profile updated successfully';
  }
}
