import { IsNotEmpty } from "class-validator";

export class profileDTO {
    @IsNotEmpty()
    profileid: number;
  
    
}