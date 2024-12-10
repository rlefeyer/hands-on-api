import {Body, Controller, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('bowling/score')
  calculateScore(@Body() frames: number[]): number {
    const score = new BowlingScore(frames);
    return score.calculateTotalScore_tpm();
  }
}
