import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreService {
  calculate(rolls: number[]): number {
    let score: number = 0;
    let frameIndex: number = 0;
    if (rolls.length === 0) {
      return score;
    }
    for (let frame = 0; frame < 10; frame++) {
      if (rolls[frameIndex] + rolls[frameIndex + 1] === 10) {
        score += 10 + rolls[frameIndex + 2];
        frameIndex += 2;
      } else {
        score += rolls[frameIndex] + rolls[frameIndex + 1];
        frameIndex += 2;
      }
    }
    return score;
  }
}
