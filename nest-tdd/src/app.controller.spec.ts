import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
    const frames = [10, 9, 1, 5, 5, 7, 2, 10, 10, 10, 9, 0, 8, 2, 9, 1, 10];
    // Calcul du score attendu : 187
    // Détails :
    // Frame 1: 10 + (9 + 1) = 20
    // Frame 2: 9 + 1 + 5 = 15
    // Frame 3: 5 + 5 + 7 = 17
    // Frame 4: 7 + 2 = 9
    // Frame 5: 10 + (10 + 10) = 30
    // Frame 6: 10 + (10 + 9) = 29
    // Frame 7: 10 + (9 + 0) = 19
    // Frame 8: 9 + 0 = 9
    // Frame 9: 8 + 2 + 9 = 19
    // Frame 10: 9 + 1 + 10 = 20
    // Total: 187
    expect(appController.calculateScore(frames)).toBe(187);
  });
});
