import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '~/constants/jwt';

const SKIP_AUTH_METADATA_KEY = 'skipAuth';
const PERMISSION_METADATA_KEY = 'permission';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.getAllAndOverride(SKIP_AUTH_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skip) {
      return true;
    }
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = this.splitToken(req.headers.authorization);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.getPayloadByJwt(token);
      // We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      req.user = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private splitToken(authorization?: string) {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private getPayloadByJwt(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: JWT_SECRET,
    });
  }
}

// This is a custom decorator that we can use to access the current user in our route handlers
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

// This decorator is used to skip authentication for a route
export const SkipAuthMetadata = () => SetMetadata(SKIP_AUTH_METADATA_KEY, true);

// export const PermissionMetadata = (code: string, bit: number) =>
//   SetMetadata(PERMISSION_METADATA_KEY, [code, bit]);
