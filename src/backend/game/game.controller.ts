import { Controller, Post, Get, Put, Body, Param, UsePipes, ValidationPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameSessionDto, EnterPortalDto, UpdateSessionDto } from './dto/game.dto';
import { GameSessionResponse } from './entities/game-session.entity';
import { PortalType } from './entities/game-session.entity';

@Controller('api/game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Post('session')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createSession(@Body() createGameSessionDto: CreateGameSessionDto): Promise<GameSessionResponse> {
    return this.gameService.startNewGame(createGameSessionDto.userId);
  }

  @Get('session/user/:userId')
  async getActiveSession(@Param('userId') userId: string): Promise<GameSessionResponse | null> {
    return this.gameService.findActiveSession(userId);
  }

  @Put('session/:sessionId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto
  ): Promise<GameSessionResponse | null> {
    return this.gameService.updateSession(sessionId, updateSessionDto);
  }

  @Post('session/:sessionId/portal')
  async enterPortal(
    @Param('sessionId') sessionId: string,
    @Body() enterPortalDto: EnterPortalDto
  ): Promise<GameSessionResponse | null> {
    return this.gameService.enterPortal(sessionId, enterPortalDto.portalType);
  }

  @Post('session/:sessionId/complete')
  @HttpCode(HttpStatus.OK)
  async completeSession(@Param('sessionId') sessionId: string): Promise<GameSessionResponse | null> {
    return this.gameService.completeGame(sessionId);
  }

  @Get('stats/user/:userId')
  async getGameStats(@Param('userId') userId: string): Promise<any> {
    return this.gameService.getGameStats(userId);
  }
}

export class CreateGameSessionDto {
  userId: string;
}

export class UpdateSessionDto {
  score?: number;
  timePlayed?: number;
  enemiesDefeated?: number;
  soulsCollected?: number;
  relicsFound?: number;
  currentLocation?: any;
  isActive?: boolean;
  difficultyLevel?: number;
}

export class EnterPortalDto {
  portalType: PortalType;
}