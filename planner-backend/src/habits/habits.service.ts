import { BadRequestException, Injectable, Param, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Task } from "src/mongoose/tasks.schema";
import { Habit } from "src/mongoose/habits.schema";
import { CreateHabitDto } from "./dto/create-habit.dto";

@Injectable()
export class HabitsService {
  constructor(
    @InjectModel(Habit.name)
    private habitModel: Model<Habit>) {}

    async getHabits(userId: string) {
        const habits = await this.habitModel.find({userId: userId});
        const sortedHabits = habits.sort((a, b) => a.order - b.order)
        return sortedHabits;
    }

    async createHabit(dto: CreateHabitDto, userId: string) {
        console.log(dto)
        const newHabit = await this.habitModel.create({
            ...dto,
            userId: userId
        })
        return await newHabit.save();
    }

    async updateHabit(dto: Partial<CreateHabitDto>, taskId: string, userId: string) {
        const newHabit = await this.habitModel.findOneAndUpdate({
            _id: taskId,
            userId: userId
        }, {
            ...dto
        })

        return newHabit;
    }

    async deleteHabit(taskId: string, userId: string) {
        const newHabit = await this.habitModel.findOneAndDelete({
            _id: taskId,
            userId: userId
        })

        return newHabit;
    }

    async updateHabitsByOrder({ids, tasksIds}: {ids: number[], tasksIds: string[]}, userId: string) {

        for(let i = 0; i < ids.length; i++) {
            await this.habitModel.findOneAndUpdate({
                userId: userId,
                order: ids[i],
                _id: tasksIds[i]
            },
                {
                    order: i + 1
                }
            )
        }
    }
}
