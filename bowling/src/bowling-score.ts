export class BowlingScore {
  private frames: number[];

  constructor(frames: number[]) {
    this.frames = frames;
  }

  calculate(): number {
    return this.frames[0];
  }
}
