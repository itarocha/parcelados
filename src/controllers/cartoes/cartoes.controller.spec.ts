import { Test, TestingModule } from '@nestjs/testing';
import { CartoesController } from './cartoes.controller';
import { CartoesService } from '../../services/cartoes/cartoes.service';

describe('CartoesController', () => {
  let controller: CartoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartoesController],
      providers: [CartoesService],
    }).compile();

    controller = module.get<CartoesController>(CartoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
