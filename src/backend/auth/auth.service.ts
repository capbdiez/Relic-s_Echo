import { Injectable, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User, UserResponse } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user.toResponse();
    }
    return null;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserResponse> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save user
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    return savedUser.toResponse();
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersRepository.find();
    return users.map(user => user.toResponse());
  }

  async findOne(id: string): Promise<UserResponse | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return user ? user.toResponse() : null;
  }
}

export { UserResponse };