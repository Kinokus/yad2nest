import { Test, TestingModule } from '@nestjs/testing';
import { HoodsService } from './hoods.service';

describe('HoodsService', () => {
  let service: HoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoodsService],
    }).compile();

    service = module.get<HoodsService>(HoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
