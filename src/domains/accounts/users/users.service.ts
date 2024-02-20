import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersSignInDto, UsersSignUpDto } from './users.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async generateAccessToken(user: Pick<User, 'id' | 'email'>): Promise<string> {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      subject: String(user.id),
      expiresIn: '7d',
    });
  }

  async signUp(signUpDto: UsersSignUpDto) {
    const { email, password } = signUpDto;
    console.log(signUpDto);

    const foundUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) throw new BadRequestException('User already exists');

    const encryptedPassword = await bcrypt.hash(password, 12);

    const user = await this.prismaService.user.create({
      data: {
        email,
        encryptedPassword,
        profile: {
          create: {},
        },
        cart: {
          create: {},
        },
      },
    });

    const accessToken = await this.generateAccessToken(user);

    return { accessToken };
  }

  async signIn(signInDto: UsersSignInDto) {
    const { email, password } = signInDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('Invalid email or password');

    const encryptedPassword = await bcrypt.compare(
      password,
      user.encryptedPassword,
    );

    if (!encryptedPassword)
      throw new BadRequestException('Invalid email or password');

    const accessToken = await this.generateAccessToken(user);

    return { accessToken };
  }
}
