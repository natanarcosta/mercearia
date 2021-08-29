import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateBoletoDto } from './dtos/create-boleto.dto';
import { UpdateBoletoDto } from './dtos/update-boleto.dto';
import { BoletosService } from './services/boletos.service';

@Controller('boletos')
export class BoletosController {
    constructor(private boletosService: BoletosService){}

    @Get()
    getBoletos(){
        return this.boletosService.getBoletos();
    }

    @Get('/all')
    getAllIncPaid(){
        return this.boletosService.getAllIncPaid();
    }

    @Get('/:id')
    async getBoletoById(@Param() id: number){
        const boleto = await this.boletosService.getBoletoById(id);
        if(!boleto){
            throw new NotFoundException('Boleto não encontrado!');
        }
        return boleto;
    }

    @Post()
    createBoleto(@Body() createBoletoDto: CreateBoletoDto){
        return this.boletosService.createBoleto(createBoletoDto);
    }

    @Delete('/:id')
    deleteBoleto(@Param() id: number){
        return this.boletosService.deleteBoleto(id);
    }

    @Patch('/:id')
    updateBoleto(@Body() body: UpdateBoletoDto, @Param() id: number){
        return this.boletosService.updateBoleto(id, body);
    }
    
}
