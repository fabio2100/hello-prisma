import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './user.service';
import {User as UserModel} from 'generated/prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Post('user')
  async createUser(@Body() userData: { email: string; name?: string }) : Promise<UserModel> {
    return this.usersService.createUser(userData);
  }

  @Patch('user/:id')
  async updateUser(@Param('id') id:string,@Body() userData: { id: number; email?: string; name?: string }) : Promise<UserModel> {
    const { ...data } = userData;
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }
}