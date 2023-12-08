import { Injectable } from '@nestjs/common';
import { DeliveryManDTO } from './deliveryMan.dto';

@Injectable()
export class DeliveryManService {
  searchDeliveryManByLocation(data: DeliveryManDTO): string[] {
    const deliveryMen: string[] = ['John Doe', 'Jane Smith'];
    return deliveryMen;
  }
}
