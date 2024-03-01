import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
  
  @Controller('habits')
  export class HabitsController {
    constructor(private readonly habitsService: HabitsService) {}

    @Get('all/:userId')
    // @UseGuards(AuthGuard('jwt'))
    async getTasks(@Param('userId') userId: string) {   
      return await this.habitsService.getHabits(userId);
    }

    @Post('create/:userId')
    async createTask(@Body() dto: CreateHabitDto, @Param('userId') userId: string) {
      return await this.habitsService.createHabit(dto, userId);
    }

    @Put('update/:userId/:taskId')
    async updateTask(@Body() dto: Partial<CreateHabitDto>, @Param('userId') userId: string, @Param('taskId') taskId: string) {
       console.log(dto)
        return await this.habitsService.updateHabit(dto, taskId, userId);
    }

    @Delete('delete/:userId/:taskId')
    async deleteTask(@Param('userId') userId: string, @Param('taskId') taskId: string) {
        return await this.habitsService.deleteHabit(taskId, userId);
    }

    @Put('updateOrder/:userId')
    async updateOrder(@Body() {ids, tasksIds}: {ids: number[], tasksIds: string[]}, @Param('userId') userId: string) {
        return await this.habitsService.updateHabitsByOrder({ids, tasksIds}, userId);
    }
  
}
  