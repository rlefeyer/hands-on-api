import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {empty} from "rxjs";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should calculate the total score for a game', () => {
    const frames = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    expect(appController.calculateScore(frames)).toBe(1);
  })

  it('should calculate the total score for a game', () => {
    const frames = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    expect(appController.calculateScore(frames)).toBe(2);
  })

  it('should calculate the total score for a game', () => {
    const frames = [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(appController.calculateScore(frames)).toBe(5);
  });

  it('should calculate the total score for a game', () => {
    const frames = [1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2];
    expect(appController.calculateScore(frames)).toBe(74);
  });

  it('should calculate the total score for a game', () => {
      const frames = [];
      if (frames.length < 0) {
        expect(appController.calculateScore(frames)).toBe(0);
      }
  });

  it('should calculate the total score for a game', () => {
    const frames = [10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(appController.calculateScore(frames)).toBe(11);
  });

  it('should calculate the total score for a game', () => {
    const frames = [10, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(appController.calculateScore(frames)).toBe(19);
  });
});
