import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from '../shared/entities/boleto.entity';
import { BoletosController } from './boletos.controller';
import { BoletosService } from './services/boletos.service';
@Module({
  imports: [TypeOrmModule.forFeature([Boleto])],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
