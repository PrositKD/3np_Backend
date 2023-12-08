import { Body, Controller, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SellerUpdateDTO } from './seller-update.dto';
import { SellerUpdateService } from './seller-update.service';

@Controller('seller')
export class SellerUpdateController {
  constructor(private readonly sellerUpdateService: SellerUpdateService) {}

  @Put('/update')
  @UsePipes(new ValidationPipe())
  updateSellerProfile(@Body() data: SellerUpdateDTO): string {
    return this.sellerUpdateService.updateSellerProfile(data);
  }
}
