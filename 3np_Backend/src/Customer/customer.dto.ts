import { IsString, Matches, IsEmail, IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class customerdto {

    @IsString({ message: "Enter first name" })
    @Matches(/^[A-Za-z]+$/, { message: "First name must only contain letters" })
    firstName: string;

    @IsString({ message: "Enter last name" })
    @Matches(/^[A-Za-z]+$/, { message: "Last name must only contain letters" })
    lastName: string;

    @IsEmail({}, { message: "Enter a valid email" })
    email: string;

    @IsString({ message: "Enter password" })
    @Matches(/^[a-zA-Z0-9]{8,}$/, { message: "Password must be at least 8 characters long and can contain alphanumeric characters" })
    password: string;

    @IsString({ message: "Enter house" })
    house: string;

    @IsString({ message: "Enter road" })
    road: string;

    @IsString({ message: "Enter district" })
    district: string;

    @IsString({ message: "Enter city" })
    city: string;

    @Matches(/^\d{11}$/, { message: "Enter a valid phone number" })
    phoneNumber: string;

    dateOfBirth: string;

    myfile:string;

    customerId: number;
}

export class logindto {

    @IsNotEmpty()
    @IsEmail({}, { message: "Enter a valid email" })
    email: string;

    @IsNotEmpty()
    password: string;
}

export class fileUploadDto {
    @IsNotEmpty()
    file: Express.Multer.File;
}




export class ProductDTO {

  @IsNotEmpty()

  productName: string;




  @IsNotEmpty()

  productDescription: string;





}
export class updatedto {

    @IsString({ message: "Enter first name" })
    @Matches(/^[A-Za-z]+$/, { message: "First name must only contain letters" })
    firstName: string;

    @IsString({ message: "Enter last name" })
    @Matches(/^[A-Za-z]+$/, { message: "Last name must only contain letters" })
    lastName: string;



    @Matches(/^\d{11}$/, { message: "Enter a valid phone number" })
    phoneNumber: string;

}
export class productDTO {

    @IsNotEmpty()
  
    productid: number;

    @IsEmail()

    email:string;
  
  
  
  
  }


