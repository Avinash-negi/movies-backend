import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto/auth.dto';
import { translate } from '../common/translations';
import { JwtPayload } from '../common/interfaces';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await User.findOne({ where: { email: registerDto.email } });
    
    if (existingUser) {
      throw new ConflictException(translate('auth.emailAlreadyExists'));
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    
    const userData: any = {
      email: registerDto.email,
      password: hashedPassword,
    };

    if (registerDto.name) {
      userData.name = registerDto.name;
    }

    const user = await User.create(userData);

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException(translate('auth.invalidCredentials'));
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token) as JwtPayload;
      const user = await User.findByPk(payload.sub);
      return user;
    } catch {
      return null;
    }
  }
}

