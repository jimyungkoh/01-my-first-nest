import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersSignInDto, UsersSignUpDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('/accounts/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: UsersSignUpDto) {
    return await this.usersService.signUp(signUpDto);
  }

  @Post('/sign-in')
  async signIn(@Body() signInDto: UsersSignInDto) {
    return await this.usersService.signIn(signInDto);
  }
}
