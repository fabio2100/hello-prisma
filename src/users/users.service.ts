import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaServiceService } from '../prisma-service/prisma-service.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaServiceService) {}

  async createUser(usersCreateInput: Prisma.usersCreateInput) {
    try {
      return await this.prisma.users.create({ data: usersCreateInput });
    } catch (error) {
      if (error.code === 'P2002') { 
        throw new ConflictException('User with this email or idNumber already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    } catch (error) {
      if (error.code === 'P2002') { 
        throw new ConflictException('User with this email or idNumber already exists');
      }
      throw error;
    }
    
  }

  async remove(id: number) {
    try {
      return await this.prisma.users.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ConflictException('User not found');
      } 
      throw error;
    }
  }
}
