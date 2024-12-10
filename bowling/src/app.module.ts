import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoreService } from './score/score.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ScoreService],
})
export class AppModule {}
