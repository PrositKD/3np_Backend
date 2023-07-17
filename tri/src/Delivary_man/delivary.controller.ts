import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe,Delete, UseInterceptors, Put, Patch, ParseIntPipe, UploadedFile, NotFoundException, HttpStatus, Session, UseGuards } from "@nestjs/common";
import { DelivaryService } from "./delivary.service";
import { DelivaryDto, LoginDTO, statusDTO, updateProfileDTO } from "./delivary.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { SellerEntity } from "src/Seller/Orders.entity";
import { IsNull } from "typeorm";
import { SessionGuard } from "./session.gaurd";
import { promises } from "dns";
import { DelivaryDEntity } from "./delivaryD.entity";


@Controller('delivary')
export class DelivaryController{
    constructor(private readonly delivaryService: DelivaryService){}
    @Get('/index')
    getIndex():any {
        return this.delivaryService.getIndex();
    }
    @Get('/search/:id')
getDelivaryById(@Param() id:number): any {
return this.delivaryService.getDelivaryById(id);
}


@Post('/signup')
@UseInterceptors(
    FileInterceptor('DPhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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
signup(@Body() data:DelivaryDto,@UploadedFile() imageobj: Express.Multer.File):any {
    console.log(data);
    console.log(imageobj.filename);
    data.photo = imageobj.filename;
return this.delivaryService.signup(data);
}

@Post('/login')
  @UsePipes(new ValidationPipe())
 async login(@Body() data: LoginDTO, @Session() session) {

      if (await this.delivaryService.login(data)){

        // session.email=loginDTO.email;

        session.email = data.email;

       

        //const tableData=await this.customerService.getDataByEmpEmail(data.email);

        return {message: 'success login',email: data.email};

    }

    else

    {

        return {message: 'Invalid login'}

    }
  }



  @Delete('/delete/:id')
  @UseGuards(SessionGuard)
 async deleteDeliveryById(@Param('id',ParseIntPipe) id: number): Promise<any> {
   await this.delivaryService.deleteDelivaryById(id);
   return 'product delete successfully';
  }
 
  // @Put('/updateprofile')
  // @UseGuards(SessionGuard)
  
  //   @UsePipes(new ValidationPipe())
  //   async update(@Param('id',ParseIntPipe) id: number, @Body() data: updateProfileDTO): Promise<any> {
      
  //      return await this.delivaryService.update(id,data);

  //   }
    
    @Get('/orders/:location')
   @UseGuards(SessionGuard)
  async findOrdersByLocation(@Param('location') location: string): Promise<SellerEntity[]> {
    const res = await this.delivaryService.getOrderByLocation(location)
    if (res !== null && res.length > 0) {
      console.log(res);
      return res;
  }
  else {
      throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          message: "Orders not found,Please try another location"
      });
  }
  }


    @Patch('/updateStatus')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updateStatus(@Body() data:statusDTO): any {
      return this.delivaryService.updateStatus(data);
    }

    @Get('/reviews/:deliverymanId')
  getReviews(@Param('deliverymanId') deliverymanId: string): any {
    return this.delivaryService.getReviewsByDeliverymanId(deliverymanId);
  }
  @Put('/updatestatus')

    //@UsePipes(new ValidationPipe())
    updatestatus(@Body() data: statusDTO): object {
        return this.delivaryService.updatestatus(data);
    }
  //   @Get('/ordersbyid/:email')
  //   @UseGuards(SessionGuard)
  //  async findOrdersByMyId(@Param('email') email: string): Promise<SellerEntity[]> {
  //    const res = await this.delivaryService.getOrderByMyId(email)
  //    if (res !== null && res.length > 0) {
  //      console.log(res);
  //      return res;
  //  }
  //  else {
  //      throw new NotFoundException({
  //          status: HttpStatus.NOT_FOUND,
  //          message: "Orders not found on your id"
  //      });
  //  }
  //  }
    @Put('/updatedelivary/:id')  //update the orders status by id
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    updatedelivaryId(@Param('id',ParseIntPipe) id: number, @Body() data: statusDTO): object {
        return this.delivaryService.updatedelivaryId(id, data);
    }

    @Put('/updateprofileid/:id')
  @UseGuards(SessionGuard)
  
    @UsePipes(new ValidationPipe())
   updated(@Param('id',ParseIntPipe) id: number, @Body() data: updateProfileDTO): object{
      
       return  this.delivaryService.updated(id,data);

    }
    
}