import {Injectable} from "@nestjs/common";

@Injectable()
export class AppService {
    getHello(): string {
        return "Hello World!";
    }

    getTotalScore(data: Array<number>): number {
        let total = 0;
        data.map(score => total += score);
        return total;
    }
}
