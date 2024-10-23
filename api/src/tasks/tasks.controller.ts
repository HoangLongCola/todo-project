import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Request,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    return this.tasksService.create(createTaskDto, req.user.sub);
  }

  @Get()
  findAll(@Request() req: any): Promise<Task[]> {
    const userId = req.user.sub;
    return this.tasksService.findAll(userId);
  }

  @Get('search')
  async search(
    @Request() req: any,
    @Query('title') title?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('isPinned') isPinned?: boolean,
    @Query('isHidden') isHidden?: boolean,
    @Query('isCompleted') isCompleted?: boolean,
  ): Promise<Task[]> {
    const userId = req.user.sub;

    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;

    return await this.tasksService.searchTasks(
      userId,
      title,
      start,
      end,
      isPinned,
      isHidden,
      isCompleted,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.tasksService.remove(+id);
  }
}
