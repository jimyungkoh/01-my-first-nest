import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { verify } from 'jsonwebtoken';
import { ParsedQs } from 'qs';
import { PrismaService } from 'src/database/prisma/prisma.service';

const JWT_SECRET = process.env.JWT_SECRET || '';

@Injectable()
export class AuthMiddleware implements NestMiddleware<Request, Response> {
  constructor(private readonly prismaService: PrismaService) {}

  async use(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: (error?: any) => void,
  ) {
    const accessToken = req.headers.authorization?.split('Bearer ')[1];

    if (!accessToken) return next();

    let id: number;
    try {
      const { sub } = verify(accessToken, JWT_SECRET);
      id = Number(sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) throw new BadRequestException('Deleted User');

    req.user = user;

    next();
  }
}
