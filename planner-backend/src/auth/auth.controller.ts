import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async signIn(@Body() user: {email: string, password: string}) {
    return await this.authService.login(user.email);
  }


  @Post('register')
  async register(@Body() user: {email: string, name: string, password: string}) {

    return await this.authService.register({email: user.email, password: user.password, username: user.name});
  }
}
