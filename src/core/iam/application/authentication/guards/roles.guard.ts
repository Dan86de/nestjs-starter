import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IamActiveUserEntity } from '../../decorators/entities/iam-active-user.entity';
import { REQUEST_USER_KEY } from '../constants/iam.constants';
import { ROLES_KEY } from '../../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!contextRoles) {
      return true;
    }
    const user: IamActiveUserEntity = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    console.log('USER ROLE: ', user.role);
    return contextRoles.some((role) => user.role === role);
  }
}
