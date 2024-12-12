import {AppService} from "./app.service";
import {Test, TestingModule} from "@nestjs/testing";
import {AppController} from "./app.controller";

describe("Bowling App", () => {
    let appService: AppService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appService = app.get<AppService>(AppService);
    });

    describe("total", () => {
        it("result should be 1", async () => {
            const result = appService.getTotalScore([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(1);
        });

        it("result should be 2", async () => {
            const result = appService.getTotalScore([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(2);
        });

        it("result should be 5", async () => {
            const result = appService.getTotalScore([3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(5);
        });

        it("result should be 74", async () => {
            const result = appService.getTotalScore([1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2]);
            expect(result).toEqual(74);
        });

        it("result should be 0", async () => {
            const result = appService.getTotalScore([]);
            expect(result).toEqual(0);
        });
    });
});