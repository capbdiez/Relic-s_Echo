import { IsString, IsEmail, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role?: 'user' | 'admin';
}

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsOptional()
  password?: string;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role?: 'user' | 'admin';
}