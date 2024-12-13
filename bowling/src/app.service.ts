import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    private total = 0;

    constructor() {
    }

    getHello(): string {
        return "Hello World!";
    }

    getTotalScore(data: Array<number>): number {
        let previousValue = 0;
        data.map((score, index) => {
            this.total += score;

            if (index % 2 === 0)
                previousValue = score;
            else if (previousValue + score === 10) this.getSpare(data, index);
        });
        return this.total;
    }

    private getSpare(arrayValue: Array<number>, indexScore: number) {
        this.total += arrayValue[indexScore + 1];
    }

    private getStrike() {
    }
}
