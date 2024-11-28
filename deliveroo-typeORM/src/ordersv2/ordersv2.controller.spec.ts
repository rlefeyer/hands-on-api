import { Test, TestingModule } from '@nestjs/testing';
import { Ordersv2Controller } from './ordersv2.controller';
import { Ordersv2Service } from './ordersv2.service';

describe('Ordersv2Controller', () => {
  let controller: Ordersv2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ordersv2Controller],
      providers: [Ordersv2Service],
    }).compile();

    controller = module.get<Ordersv2Controller>(Ordersv2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
