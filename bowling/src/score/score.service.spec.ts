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

  it('should return 10', () => {
    expect(
      service.calculate([
        1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(10);
  });

  it('should return 18', () => {
    expect(
      service.calculate([
        1, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(18);
  });

  it('should return 43', () => {
    expect(
      service.calculate([
        1, 9, 7, 3, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(43);
  });

  it('should return 11', () => {
    expect(
      service.calculate([
        10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(11);
  });

  it('should return 19', () => {
    expect(
      service.calculate([
        10, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(19);
  });

  it('should return 20', () => {
    expect(
      service.calculate([
        10, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(20);
  });

  it('should return 42', () => {
    expect(
      service.calculate([
        10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(42);
  });

  it('should return 60', () => {
    expect(
      service.calculate([
        10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ]),
    ).toBe(60);
  });

  it('should return 52', () => {
    expect(
      service.calculate([
        10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0,
      ]),
    ).toBe(52);
  });

  it('should return 57', () => {
    expect(
      service.calculate([
        10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5,
      ]),
    ).toBe(57);
  });

  it('should return 61', () => {
    expect(
      service.calculate([
        10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 2,
      ]),
    ).toBe(61);
  });

  it('should return 300', () => {
    expect(
      service.calculate([
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      ]),
    ).toBe(300);
  });
});