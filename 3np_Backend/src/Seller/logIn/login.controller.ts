import { Body, Controller, Post, Req, Res, Session, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './login.dto';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')

  @UsePipes(new ValidationPipe())

 async login(@Body() data: LoginDTO, @Session() session) {
  const result= await this.loginService.login(data);
  if (result) {
    session.email = data.username;
    console.log(session.email);
  }
  return result;
 }

 @Post('/signout')
 signout( @Req() req) {
     if (req.session.destroy()) {
         return true;
     }
     else {
         throw new UnauthorizedException("invalid actions");
     }
 }

}

