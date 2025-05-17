import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthorizeGuard implements CanActivate{
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Extract the request object from the context
    const request = context.switchToHttp().getRequest();
    
    // Extract token from the request header
    const token = request.headers['authorization']?.split(' ')[1];
    // console.log(token);
    // Validate token and provide / deny access

    return false;
  }
  
}