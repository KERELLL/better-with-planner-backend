import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from 'src/tasks/tasks.controller';
import { TasksService } from 'src/tasks/tasks.service';
import { Task, TaskSchema } from '../mongoose/tasks.schema';
import { Habit, HabitSchema } from 'src/mongoose/habits.schema';
import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

@Module({
imports: [
    MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }]),
    ],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
