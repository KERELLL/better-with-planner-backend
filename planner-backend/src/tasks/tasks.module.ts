import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from 'src/tasks/tasks.controller';
import { TasksService } from 'src/tasks/tasks.service';
import { Task, TaskSchema } from '../mongoose/tasks.schema';

@Module({
imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
