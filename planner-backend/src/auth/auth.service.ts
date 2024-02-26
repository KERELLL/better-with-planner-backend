import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as argon2 from "argon2";
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, password: string){
      const user = await this.userService.findUser(email);
      const passwordIsMatch = await argon2.verify(user.password, password);

      if(user && passwordIsMatch) {
        return user;
      }

      throw new UnauthorizedException("User or password are incorrect");
  }

  async validateEmail(email: string){
    try{
      const result = await this.userService.findEmail(email);
      return result;
    }catch(error) {
      throw error;
    }
}

  async login(email: string) {
    const user = await this.userService.findUser(email);
    console.log(user);
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name
      },
      tokens: {
          accessToken: this.jwtService.sign({email, id: user._id, name: user.name}),
      }
    };
  }

  async register(dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);
    if(user) {
      return {
        user: {
          email: user.email,
          name: user.name,
          _id: user._id
        },
        tokens: {
          accessToken: this.jwtService.sign({email: dto.email, id: user._id, name: user.name})
        }
      }
    }
  }
}