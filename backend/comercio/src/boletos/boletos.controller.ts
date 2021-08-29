import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { BoletosService } from './services/boletos.service';

@Controller('boletos')
export class BoletosController {
  constructor(private boletosService: BoletosService) {}

  @Get()
  getBoletos() {
    return this.boletosService.getBoletos();
  }

  @Get('/all')
  getAllIncPaid() {
    return this.boletosService.getAllIncPaid();
  }

  @Get('/:id')
  getBoletoById(@Param() id: number) {
    return this.boletosService.getBoletoById(id);
  }

  @Post()
  createBoleto(@Body() createBoletoDto: CreateBoletoDto) {
    return this.boletosService.createBoleto(createBoletoDto);
  }

  @Delete('/:id')
  deleteBoleto(@Param() id: number) {
    return this.boletosService.deleteBoleto(id);
  }

  @Patch('/:id')
  updateBoleto(@Body() body: UpdateBoletoDto, @Param() id: number) {
    return this.boletosService.updateBoleto(id, body);
  }
}
