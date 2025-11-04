import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { translate } from '../../common/translations';
import { BEARER_AUTH } from '../../common/constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard(BEARER_AUTH.STRATEGY_NAME) {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(translate('auth.invalidToken'));
    }
    return user;
  }
}

