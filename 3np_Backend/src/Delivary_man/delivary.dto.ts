import { IsEAN, IsEmail, IsIn, IsNotEmpty, IsString, Matches,MinLength } from "class-validator";

export class DelivaryDto{
    @IsString({message:"enter name"})
    @Matches(/^[a-zA-Z- ]+$/,{message:"Name must be A_z"})
    @IsNotEmpty()
    name:string;
    @IsEmail(
       {},{ message: "enter a valid email"}
    )
    email: string;
    @IsNotEmpty()
    @Matches(/^\d{11}$/, { message: 'Invalid mobile number format' })
    phone: number;
    
    @IsNotEmpty()
    tk: number;

  @IsNotEmpty()
    @IsIn(['bike', 'cycle', 'truck'])
    vechile: string;
    
  
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    gender: string;

    @MinLength (4,{message:"Password is minimum 4 charecter"})
    password: string;
    photo: string;
    
}

export class LoginDTO {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
  
    @IsNotEmpty()
    password: string;
}
export class statusDTO {
    @IsNotEmpty()
    @IsIn(['pending', 'in_progress', 'completed','rejected'])
    Status: string;
    Seller: string;
    Receiver: string;
    Product: string;
    Time: Date;
    Address: string;
    Area: string;
    phone: number;
    id: number;
    delivaryManEmail:string;
  }
  
  export class updateProfileDTO{
    @IsString({message:"enter name"})
    @Matches(/^[a-zA-Z- ]+$/,{message:"Name must be A_z"})
    @IsNotEmpty()
    name:string;
   
    @IsNotEmpty()
    
    phone: number;
    
    @IsNotEmpty()
    tk: string;

  @IsNotEmpty()
    @IsIn(['bike', 'cycle', 'truck'])
    vechile: string;
    
  
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    gender: string;

    photo: string;
    
   
    
}
