import { Test, TestingModule } from '@nestjs/testing';
import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreService],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
  });

  it('should return 1', () => {
    expect(
      service.calculate([
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(1);
  });

  it('should return 2', () => {
    expect(
      service.calculate([
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(2);
  });

  it('should return 5', () => {
    expect(
      service.calculate([
        3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(5);
  });

  it('should return 74', () => {
    expect(
      service.calculate([
        1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2,
      ]),
    ).toBe(74);
  });

  it('should return 0 when empty', () => {
    expect(service.calculate([])).toBe(0);
  });
});
