
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum Colors {
    RED = 'crimson',
    YELLOW = 'gold',
    GREEN = 'forestgreen',
    GRAY = 'gray',
    BLUE = 'royalblue',
    PURPLE = 'blueviolet',
    PINK = 'orchid',
    ORANGE = 'orange',
    GRAY_LIGHT = 'lightgray',
    DEFAULT = 'lightgray'
}

export class CreateHabitDto {

    @IsString()
    name: string;

    @IsNumber()
    duration: number;

    @IsNumber()
    @IsOptional()
    order?: string;

    @IsEnum(Colors)
    @IsString()
    color?: string;
  }
  