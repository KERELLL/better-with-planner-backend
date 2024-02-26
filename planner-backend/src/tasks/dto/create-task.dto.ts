import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Priority } from "./priority.enum";

export class CreateTaskDto {

    @IsString()
    name: string;

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsString()
    @IsOptional()
    createdAt?: string;
  }
  