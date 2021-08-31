import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoletoDto } from '../dtos/create-boleto.dto';
import { Boleto } from '../../shared/entities/boleto.entity';
@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto) private repoBoleto: Repository<Boleto>,
  ) {}

  createBoleto(createBoletoDto: CreateBoletoDto) {
    const newBoleto = this.repoBoleto.create({
      empresa: createBoletoDto.empresa,
      vencimento: createBoletoDto.vencimento,
      valor: createBoletoDto.valor,
      pago: false,
    });
    return this.repoBoleto.save(newBoleto);
  }

  getBoletos() {
    return this.repoBoleto
      .createQueryBuilder('boleto')
      .where('boleto.pago = false')
      .orderBy('boleto.vencimento', 'ASC')
      .getMany();
  }

  getAllIncPaid() {
    return this.repoBoleto
      .createQueryBuilder('boleto')
      .orderBy('boleto.vencimento', 'ASC')
      .getMany();
  }

  async getBoletoById(id: number) {
    const boleto = await this.repoBoleto.findOne(id);
    if (!boleto) {
      throw new NotFoundException('Boleto não encontrado!');
    }
    return boleto;
  }

  async deleteBoleto(id: number) {
    const boleto = await this.getBoletoById(id);
    if (!boleto) {
      throw new NotFoundException('Boleto não encontrado!');
    }
    return this.repoBoleto.remove(boleto);
  }

  async updateBoleto(id: number, params: Partial<Boleto>) {
    const boleto = await this.getBoletoById(id);
    if (!boleto) {
      throw new NotFoundException('Boleto não encontrado!');
    }
    Object.assign(boleto, params);
    return this.repoBoleto.save(boleto);
  }
}
