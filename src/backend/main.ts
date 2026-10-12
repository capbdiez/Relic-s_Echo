import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend development
  app.enableCors();
  
  // Global validation pipe for input validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Relics of Echo API')
    .setDescription('2D Action-RPG Game Backend')
    .setVersion('1.0.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('players', 'Player management endpoints')
    .addTag('game', 'Game logic endpoints')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Relics of Echo backend running on http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
  console.error('Failed to start Relics of Echo backend:', error);
  process.exit(1);
});