import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    if (!userId) throw new UnauthorizedException('Chưa đăng nhập');
    const taskNew = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return this.taskRepository.save(taskNew);
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        is_pinned: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async searchTasks(
    userId: number, 
    searchTerm?: string, 
    startDate?: Date, 
    endDate?: Date, 
    isPinned?: boolean, 
    isHidden?: boolean, 
    isCompleted?: boolean
  ): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task')
      .where('task.userId = :userId', { userId });
  
    if (searchTerm) {
      query.andWhere('task.title LIKE :searchTerm', { searchTerm: `%${searchTerm}%` });
    }
  
    if (startDate) {
      query.andWhere('task.createdAt >= :startDate', { startDate });
    }
  
    if (endDate) {
      query.andWhere('task.due_date <= :endDate', { endDate });
    }
  
    if (isPinned !== undefined) {
      query.andWhere('task.is_pinned = :isPinned', { isPinned });
    }
  
    if (isHidden !== undefined) {
      query.andWhere('task.is_hidden = :isHidden', { isHidden });
    }
  
    if (isCompleted !== undefined) {
      query.andWhere('task.is_completed = :isCompleted', { isCompleted });
    }
  
    return await query.orderBy('task.is_pinned', 'DESC')
      .addOrderBy('task.createdAt', 'DESC')
      .getMany();
  }
  

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    await this.taskRepository.delete(id);
    return true;
  }
}
