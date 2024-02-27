import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
@Schema({ collection: 'Task' })
export class Task extends Document {

  @Prop()
  name: string;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;

  @Prop()
  priority: string;

  @Prop()
  userId: string;

  @Prop()
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
