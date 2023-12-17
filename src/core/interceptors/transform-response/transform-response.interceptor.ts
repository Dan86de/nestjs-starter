import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        if (!response) {
          return {
            data: [],
          };
        }
        if (response.data && response.meta) {
          return {
            data: response.data,
            meta: response.meta,
          };
        }
        return { data: response };
      }),
    );
  }
}
