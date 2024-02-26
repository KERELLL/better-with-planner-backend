import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';
@Schema({timestamps: true,  collection: 'Task' })
export class Task extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop({default: now()})
  createdAt: Date;

  @Prop({default: now()})
  updatedAt: Date;

  @Prop()
  priority: string;

  @Prop()
  userId: string;

  @Prop()
  isCompleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
