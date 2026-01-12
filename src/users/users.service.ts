import { Injectable, ConflictException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/browser';
import { PrismaServiceService } from '../prisma-service/prisma-service.service';

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

  /*findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }*/
}
