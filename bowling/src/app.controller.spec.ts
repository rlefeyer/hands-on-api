import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BowlingScore } from './bowling-score';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('BowlingScore', () => {
    it('should calculate the score for frames [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(1);
    });

    it('should calculate the score for frames [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(2);
    });

    it('should calculate the score for frames [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(5);
    });

    it('should calculate the score for frames [1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2]', () => {
      const bowlingScore = new BowlingScore([
        1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2,
      ]);
      expect(bowlingScore.calculate()).toBe(74);
    });

    it('should calculate the score for empty frames []', () => {
      const bowlingScore = new BowlingScore([]);
      expect(bowlingScore.calculate()).toBe(0);
    });

    it('should calculate the score for frames [1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(10);
    });

    it('should calculate the score for frames [1, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        1, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(18);
    });

    it('should calculate the score for frames [1, 9, 7, 3, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
      const bowlingScore = new BowlingScore([
        1, 9, 7, 3, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]);
      expect(bowlingScore.calculate()).toBe(43);
    });

    it('should calculate the score for frames [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]', () => {
      const bowlingScore = new BowlingScore([
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      ]);
      expect(bowlingScore.calculate()).toBe(300);
    });
  });
});
