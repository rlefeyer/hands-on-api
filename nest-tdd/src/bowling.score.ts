export class BowlingScore {
    private readonly frames: number[];

    constructor(frames: number[]) {
        if (!this.isValidFrames(frames)) {
            throw new Error('Invalid frame data');
        }
        this.frames = frames;
    }

    calculateTotalScore_tpm(): number {
        let totalScore = 0;
        let frameIndex = 0;

        for (let frame = 0; frame < 10; frame++) {
            if (this.isStrike(frameIndex)) {
                // Strike: 10 + next two rolls
                totalScore += 10 + this.strikeBonus(frameIndex);
                frameIndex++;
            } else if (this.isSpare(frameIndex)) {
                // Spare: 10 + next roll
                totalScore += 10 + this.spareBonus(frameIndex);
                frameIndex += 2;
            } else {
                // Open frame: sum of both rolls
                totalScore += this.sumOfFrame(frameIndex);
                frameIndex += 2;
            }
        }

        return totalScore;
    }

    private isStrike(frameIndex: number): boolean {
        return this.frames[frameIndex] === 10;
    }

    private isSpare(frameIndex: number): boolean {
        return this.frames[frameIndex] + this.frames[frameIndex + 1] === 10;
    }

    private strikeBonus(frameIndex: number): number {
        return this.frames[frameIndex + 1] + this.frames[frameIndex + 2];
    }

    private spareBonus(frameIndex: number): number {
        return this.frames[frameIndex + 2];
    }

    private sumOfFrame(frameIndex: number): number {
        return this.frames[frameIndex] + this.frames[frameIndex + 1];
    }

    private isValidFrames(frames: number[]): boolean {
        // Ensure the frames array is a valid representation of a bowling game
        if (!Array.isArray(frames)) return false;
        if (frames.length < 12 || frames.length > 21) return false; // Typical frame count range
        return frames.every(score => Number.isInteger(score) && score >= 0 && score <= 10);
    }
}
