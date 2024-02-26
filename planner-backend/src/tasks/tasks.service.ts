import { BadRequestException, Injectable, Param, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "src/mongoose/tasks.schema";

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<Task>) {}

    async getTasks(userId: string) {
        const tasks = await this.taskModel.find({userId: userId});
        return tasks;
    }

    async createTask(dto: CreateTaskDto, userId: string) {
        const newTask = await this.taskModel.create({
            ...dto,
            userId: userId
        })
        return await newTask.save();
    }

    async updateTask(dto: Partial<CreateTaskDto>, taskId: string, userId: string) {
        const newTask = await this.taskModel.findOneAndUpdate({
            _id: taskId,
            userId: userId
        }, {
            ...dto
        })

        console.log(newTask)

        return newTask;
    }

    async deleteTask(taskId: string, userId: string) {
        const newTask = await this.taskModel.findOneAndDelete({
            _id: taskId,
            userId: userId
        })

        return newTask;
    }
}
