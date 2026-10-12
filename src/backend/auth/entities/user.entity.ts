import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;

  @Column({ default: 'player' })
  @IsString()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 1 })
  level: number;

  // Non-sensitive data methods
  toResponse() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      experience: this.experience,
      level: this.level,
      createdAt: this.createdAt,
    };
  }
}

export type UserResponse = Omit<User, 'password'>;