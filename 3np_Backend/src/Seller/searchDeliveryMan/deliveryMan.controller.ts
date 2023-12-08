import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeliveryManDTO } from './deliveryMan.dto';
import { DeliveryManService } from './deliveryMan.service';

@Controller('delivery-man')
export class DeliveryManController {
  constructor(private readonly deliveryManService: DeliveryManService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe())
  searchDeliveryManByLocation(@Query() data: DeliveryManDTO): string[] {
    return this.deliveryManService.searchDeliveryManByLocation(data);
  }
}
