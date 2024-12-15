import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    private total = 0;
    private previousValue = 0;

    constructor() {
    }

    getHello(): string {
        return "Hello World!";
    }

    getTotalScore(data: Array<number>): number {
        data.map((score, index) => {
            this.total += score;

            if (score === 10)
                this.getStrike(data, index);
            else if (index % 2 === 0)
                this.previousValue = score;
            else if (this.previousValue + score === 10)
                this.getSpare(data, index);

            if (index >= data.length - 3 && score === 10) {
                this.lastFrames(data, index);
            }
        });

        return this.total;
    }

    private getSpare(arrayValue: Array<number>, indexScore: number) {
        this.total += arrayValue[indexScore + 1];
    }

    private getStrike(arrayValue: Array<number>, indexScore: number) {
        this.total += arrayValue[indexScore + 1] ?? 0;
        this.total += arrayValue[indexScore + 2] ?? 0;
    }

    private lastFrames(arrayValue: Array<number>, indexScore: number) {
        this.total -= arrayValue[indexScore + 1] ?? 0;
        this.total -= arrayValue[indexScore + 2] ?? 0;
    }
}
