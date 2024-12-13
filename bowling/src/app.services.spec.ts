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

    describe("total without strike or spare", () => {
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

    describe("total with spare", () => {
        it("result should be 10", async () => {
            const result = appService.getTotalScore([1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(10);
        });

        it("result should be 18", async () => {
            const result = appService.getTotalScore([1, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(18);
        });

        it("result should be 43", async () => {
            const result = appService.getTotalScore([1, 9, 7, 3, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(43);
        });
    });

    describe("total with strike", () => {
        it("result should be 11", async () => {
            const result = appService.getTotalScore([10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(11);
        });

        it("result should be 19", async () => {
            const result = appService.getTotalScore([10, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(19);
        });

        it("result should be 20", async () => {
            const result = appService.getTotalScore([10, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(20);
        });

        it("result should be 42", async () => {
            const result = appService.getTotalScore([10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(42);
        });

        it("result should be 60", async () => {
            const result = appService.getTotalScore([10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            expect(result).toEqual(60);
        });
    });

    describe("total with bonus on the last frame", () => {
        it("result should be 52", async () => {
            const result = appService.getTotalScore([10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0]);
            expect(result).toEqual(52);
        });

        it("result should be 57", async () => {
            const result = appService.getTotalScore([10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5]);
            expect(result).toEqual(57);
        });
    });
});