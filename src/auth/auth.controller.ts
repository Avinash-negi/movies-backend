import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto/auth.dto';
import { HTTP_STATUS_CODES } from '../common/constants';
import { API_DESCRIPTIONS } from '../common/api-descriptions';
import { API_ROUTES, API_TAGS } from '../common/constants';

@ApiTags(API_TAGS.AUTH)
@Controller(API_ROUTES.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: API_DESCRIPTIONS.auth.register.summary, description: API_DESCRIPTIONS.auth.register.description })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: HTTP_STATUS_CODES.CREATED,
    description: API_DESCRIPTIONS.auth.register.successDescription,
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HTTP_STATUS_CODES.BAD_REQUEST,
    description: API_DESCRIPTIONS.auth.register.errorDescription,
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: API_DESCRIPTIONS.auth.login.summary, description: API_DESCRIPTIONS.auth.login.description })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: HTTP_STATUS_CODES.OK,
    description: API_DESCRIPTIONS.auth.login.successDescription,
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HTTP_STATUS_CODES.UNAUTHORIZED,
    description: API_DESCRIPTIONS.auth.login.errorDescription,
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }
}

