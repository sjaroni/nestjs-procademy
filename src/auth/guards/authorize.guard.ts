import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../config/auth.config';
import { Reflector } from '@nestjs/core';
import { REQUEST_USER_KEY } from 'src/constants/constants';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly reflector: Reflector, // read metadata
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // read isPublic metadata
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(), // check if the method has the metadata (e.g. controller method @Post('login'))
      context.getClass(), // check if the class has the metadata (e.g. controller @Controller('users'))
    ]);

    if (isPublic) {
      return true; // if the route is public, allow access
    }

    // Extract the request object from the context
    const request = context.switchToHttp().getRequest();

    // Extract token from the request header
    const token = request.headers['authorization']?.split(' ')[1];

    // Validate token and provide / deny access
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.authConfiguration,
      );

      request[REQUEST_USER_KEY] = payload;
      
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
