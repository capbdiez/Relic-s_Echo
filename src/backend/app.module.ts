import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { PlayersModule } from './players/players.module';
import { GameModule } from './game/game.module';
import { CharacterProgressionModule } from './character-progression/character-progression.module';
import { InventoryModule } from './inventory/inventory.module';
import { EnemiesModule } from './enemies/enemies.module';
import { SkillTreeModule } from './skill-tree/skill-tree.module';
import { WorldModule } from './world/world.module';

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
    InventoryModule,
    EnemiesModule,
    SkillTreeModule,
    WorldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}