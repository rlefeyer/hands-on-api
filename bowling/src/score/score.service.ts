import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreService {
  calculate(rolls: number[]): number {
    return rolls.reduce((sum, roll) => sum + roll, 0);
  }
}
