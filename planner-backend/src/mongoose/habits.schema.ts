import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
@Schema({ collection: 'Habit' })
export class Habit extends Document {

  @Prop()
  name: string;

  @Prop()
  order: number;

  @Prop()
  userId: string;

  @Prop()
  color: string;

  @Prop()
  duration: number;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
