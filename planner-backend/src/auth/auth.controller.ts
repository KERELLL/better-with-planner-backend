import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('auth'))
  async signIn(@Body() user: { email: string; password: string }) {
    return await this.authService.login(user.email);
  }

  @Post('checkEmail')
  async checkEmail(@Body() user: { email: string }) {
    return await this.authService.validateEmail(user.email);
  }

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
  ) {
    return await this.authService.register({
      email: dto.email,
      password: dto.password,
      username: dto.username,
    });
  }
}
