import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class SignedInOnlyGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const signedInOnly = this.reflector.get<boolean>(
      'SignedInOnly',
      context.getHandler(),
    );

    if (!signedInOnly) return true;

    const request = context.switchToHttp().getRequest<Request>();
    if (!request.user) throw new UnauthorizedException();

    return true;
  }
}
