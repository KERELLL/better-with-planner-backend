import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Task } from './tasks.schema';
@Schema({ collection: 'User' })
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
