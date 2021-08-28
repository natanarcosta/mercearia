import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateBoletoDto } from "../dtos/update-boleto.dto";
import { Boleto } from "../entities/boleto.entity";

@Injectable()
export class BoletosService{
    constructor(@InjectRepository(Boleto) private repo: Repository<Boleto>){}

    createBoleto(empresa: string, vencimento: string, valor: number){
        const newBoleto = this.repo.create({
            empresa: empresa,
            vencimento: vencimento,
            valor: valor,
            pago: false
        });
        return this.repo.save(newBoleto);
    }

    getBoletos(){
        return this.repo.find();
    }

    getBoletoById(id: number){
        return this.repo.findOne(id);
    }

    async deleteBoleto(id: number){
        const boleto = await this.getBoletoById(id);
        if(!boleto){
            throw new NotFoundException('Boleto não encontrado.');
        }
        return this.repo.remove(boleto);
    }
    async updateBoleto(id: number, params: Partial<Boleto>){
        const boleto = await this.getBoletoById(id);
        if(!boleto){
            throw new NotFoundException('Boleto não encontrado!');
        }
        Object.assign(boleto, params);
        return this.repo.save(boleto);
    }
}