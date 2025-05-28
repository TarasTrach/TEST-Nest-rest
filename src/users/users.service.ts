import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<any>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (exists) throw new ConflictException('Email already in use');

    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findUserById(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
