import { Controller, Post, Get, Body, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';
import { UserResponse } from './entities/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('users')
  async findAll(): Promise<UserResponse[]> {
    return this.authService.findAll();
  }
}

export class CreateUserDto {
  email: string;
  password: string;
  role?: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}