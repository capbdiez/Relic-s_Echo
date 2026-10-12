import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';
import { CharacterProgressionModule } from './character-progression/character-progression.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Database configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'relics_of_echo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production', // Don't auto-sync in production
      logging: process.env.NODE_ENV !== 'production',
    }),
    
    // Static file serving for frontend assets
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
      serveRoot: '/',
    }),
    
    // Module imports
    AuthModule,
    PlayersModule,
    GameModule,
    CharacterProgressionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}