import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { API_DESCRIPTIONS } from '../../common/api-descriptions';
import { EXAMPLE_VALUES } from '../../common/constants';

export class LoginDto {
  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.email,
    example: EXAMPLE_VALUES.EMAIL,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.password,
    example: EXAMPLE_VALUES.PASSWORD,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}

export class RegisterDto {
  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.email,
    example: EXAMPLE_VALUES.EMAIL,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.password,
    example: EXAMPLE_VALUES.PASSWORD,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiPropertyOptional({
    description: API_DESCRIPTIONS.auth.dto.name,
    example: EXAMPLE_VALUES.USER_NAME,
  })
  @IsString()
  @IsOptional()
  name?: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.userInfo,
    example: {
      id: EXAMPLE_VALUES.UUID,
      email: EXAMPLE_VALUES.EMAIL,
      name: EXAMPLE_VALUES.USER_NAME,
    },
  })
  user!: {
    id: string;
    email: string;
    name?: string;
  };

  @ApiProperty({
    description: API_DESCRIPTIONS.auth.dto.jwtToken,
    example: EXAMPLE_VALUES.JWT_TOKEN,
  })
  token!: string;
}

