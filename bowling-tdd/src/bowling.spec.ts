import { calculateScore } from "./bowling";

// ############ STEP 1 ############

describe('Bowling Score Calculator', () => {
  it('should return 1', () => {
    const input = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(1);
  });

  it('should return 2', () => {
    const input = [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(2);
  });

  it('should return 5', () => {
    const input = [3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(5);
  });

  it('should return 74', () => {
    const input = [1, 6, 3, 5, 1, 2, 9, 0, 3, 2, 7, 2, 5, 4, 4, 3, 6, 2, 7, 2];
    expect(calculateScore(input)).toBe(74);
  });

  it('should return 0', () => {
    const input: number[] = [];
    expect(calculateScore(input)).toBe(0);
  });
});


// ############ STEP 2 ############
  it('should return 10', () => {
    const input = [1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(10);
  });

  it('should return 18', () => {
    const input = [1, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(18);
  });

  it('should return 43', () => {
    const input = [1, 9, 7, 3, 7, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(43);
  });

  // ############ STEP 3 ############

  it('should return 11', () => {
    const input = [10, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(11);
  });

  it('should return 19', () => {
    const input = [10, 2, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(19);
  });

  it('should return 20', () => {
    const input = [10, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(20);
  });

  it('should return 42', () => {
    const input = [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(42);
  });

  it('should return 60', () => {
    const input = [10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(calculateScore(input)).toBe(60);
  });

  // ############ STEP 4 ############

  it('should return 52 for input [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0]', () => {
    const input = [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0];
    expect(calculateScore(input)).toBe(52);
  });

  it('should return 57 for input [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5]', () => {
    const input = [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 5];
    expect(calculateScore(input)).toBe(57);
  });

  it('should return 59 for input [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 2]', () => {
    const input = [10, 10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 7, 2];
    expect(calculateScore(input)).toBe(59);
  });

  it('should return 300 for input [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]', () => {
    const input = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    expect(calculateScore(input)).toBe(300);
  });
