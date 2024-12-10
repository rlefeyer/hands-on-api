export class BowlingScore {
  private frames: number[];

  constructor(frames: number[]) {
    this.frames = frames;
  }

  calculate(): number {
    let totalScore = 0;
    let frameIndex = 0;

    for (let frame = 0; frame < 10; frame++) {
      if (this.frames[frameIndex] === 10) {
        totalScore +=
          10 +
          (this.frames[frameIndex + 1] || 0) +
          (this.frames[frameIndex + 2] || 0);
        frameIndex += 1;
      } else if (
        (this.frames[frameIndex] || 0) + (this.frames[frameIndex + 1] || 0) ===
        10
      ) {
        totalScore += 10 + (this.frames[frameIndex + 2] || 0);
        frameIndex += 2;
      } else {
        totalScore +=
          (this.frames[frameIndex] || 0) + (this.frames[frameIndex + 1] || 0);
        frameIndex += 2;
      }
    }

    return totalScore;
  }
}
