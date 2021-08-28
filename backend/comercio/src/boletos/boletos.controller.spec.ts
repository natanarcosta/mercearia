import { Test, TestingModule } from '@nestjs/testing';
import { BoletosController } from './boletos.controller';

describe('BoletosController', () => {
  let controller: BoletosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoletosController],
    }).compile();

    controller = module.get<BoletosController>(BoletosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
