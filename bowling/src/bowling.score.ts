export class BowlingScore {
    private frames: number[];

    constructor(frames: number[]) {
        this.frames = frames;
    }

    calculate(): number {
        if (this.frames.length === 0) {
            return 0;
        }

        let score = 0;
        let frameIndex = 0;

        for (let frame = 0; frame < 10; frame++) {
            if (this.isStrike(frameIndex)) {
                score += 10 + this.strikeBonus(frameIndex);
                frameIndex++;
            } else if (this.isSpare(frameIndex)) {
                score += 10 + this.spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                score += this.sumOfBallsInFrame(frameIndex);
                frameIndex += 2;
            }
        }

        return score;
    }

    private isStrike(frameIndex: number): boolean {
        return this.frames[frameIndex] === 10;
    }

    private isSpare(frameIndex: number): boolean {
        return this.frames[frameIndex] + (this.frames[frameIndex + 1] || 0) === 10;
    }

    private strikeBonus(frameIndex: number): number {
        return (this.frames[frameIndex + 1] || 0) + (this.frames[frameIndex + 2] || 0);
    }

    private spareBonus(frameIndex: number): number {
        return this.frames[frameIndex + 2] || 0;
    }

    private sumOfBallsInFrame(frameIndex: number): number {
        return (this.frames[frameIndex] || 0) + (this.frames[frameIndex + 1] || 0);
    }
}