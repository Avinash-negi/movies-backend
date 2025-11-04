import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('SEQUELIZE') private sequelize: Sequelize) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: any) {
    const UserModel = this.sequelize.models.User as typeof User;
    if (!UserModel) {
      return null;
    }
    const user = await UserModel.findByPk(payload.sub);
    if (!user) {
      return null;
    }
    return { id: user.id, email: user.email, name: user.name };
  }
}

