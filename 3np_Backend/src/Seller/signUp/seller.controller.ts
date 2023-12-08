import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SellerService } from './seller.service';
import { SellerDTO } from './seller.dto';
import { SellerCDTO } from './seller.dto copy';
import { profileDTO } from './profile.dto';
import { SessionGuard } from 'src/session.gaurd';
import { SellerEntity } from './seller.entity';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post('/signup')
  @UseInterceptors(
  
    FileInterceptor('shopPhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(JPJ|jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type: Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, 
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async signUp(@Body() data: SellerDTO): Promise<any> {

    return this.sellerService.signUp(data);
  }
  
  

  @Post('profilePic')
  //@UseGuards(SessionGuard)
  @UseInterceptors(
    FileInterceptor('shopPhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(JPJ|jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type: Only JPG, JPEG, PNG, and GIF files are allowed.'), false);
        }
      },
      limits: {
        fileSize: 1024 * 1024 * 5, 
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async uploadp(@Body() data: profileDTO, @UploadedFile() shopPhoto: Express.Multer.File):Promise<any> {
    return await this.sellerService.uploadp(data, shopPhoto);
  }

  @Get('/:email')
  async getPhotoPathByEmail(@Param('email') email: string): Promise<string> {
    const seller: SellerEntity = await this.sellerService.findByEmail(email);
    
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }

    return seller.photoPath;
  }


  @Post('/otp')
  async verifyOTP( @Body() data: SellerCDTO): Promise<any> {
  
    return await this.sellerService.verifyOTP(data);
  }
}


