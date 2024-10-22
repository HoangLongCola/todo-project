import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Chưa nhập tên công việc' })
  title: string;

  @IsOptional()
  is_completed: boolean;

  @IsOptional()
  is_hidden: boolean;

  @IsOptional()
  is_pinned: boolean;

  @IsOptional()
  due_date: string;

}
