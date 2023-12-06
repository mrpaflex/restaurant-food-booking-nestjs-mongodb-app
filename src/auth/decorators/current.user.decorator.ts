
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user/schema/user.schema';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):Promise<User> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);