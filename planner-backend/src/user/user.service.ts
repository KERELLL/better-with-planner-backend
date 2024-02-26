import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from "argon2";
import { User } from 'src/mongoose/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}

    async findUser(email: string) {
        try{
            const user = await this.userModel.findOne({ email });

            if(!user) {
                throw new BadRequestException("User not found!");
            }

            return user;
        }catch(error) {
            throw new BadRequestException(error);
        }
    }

    async createUser(dto: CreateUserDto) {
        try{
            const isUserExists = await this.userModel.findOne({ email: dto.email });
            if(isUserExists) {
                throw new BadRequestException("User already exists");
            }

            const hashedPassword = await argon2.hash(dto.password);
            const newUser = {email: dto.email, name: dto.username, password: hashedPassword};
            
            const user = await this.userModel.create(newUser);
    
            return user;
        }catch(error) {
            throw new BadRequestException(error);
        }
    }

    async findEmail(email: string) {
        try{
            const user = await this.userModel.findOne({ email });
            if(user !== null) {
                throw new BadRequestException("User alredy exists!");
            }
            return {message: 'success'};
        }catch(error) {
            throw new BadRequestException(error);
        }
    }
}