import { Test, TestingModule } from '@nestjs/testing';
import { HoodsController } from './hoods.controller';

describe('HoodsController', () => {
  let controller: HoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoodsController],
    }).compile();

    controller = module.get<HoodsController>(HoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
