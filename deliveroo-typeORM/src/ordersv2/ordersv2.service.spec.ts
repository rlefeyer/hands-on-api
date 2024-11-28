import { Test, TestingModule } from '@nestjs/testing';
import { Ordersv2Service } from './ordersv2.service';

describe('Ordersv2Service', () => {
  let service: Ordersv2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ordersv2Service],
    }).compile();

    service = module.get<Ordersv2Service>(Ordersv2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
