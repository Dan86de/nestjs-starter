import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { REQUEST_USER_KEY } from '../authentication/constants/iam.constants';
import { IamActiveUserEntity } from './entities/iam-active-user.entity';

export const ActiveUserDecorator = createParamDecorator(
  (field: keyof IamActiveUserEntity | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IamActiveUserEntity | undefined = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
