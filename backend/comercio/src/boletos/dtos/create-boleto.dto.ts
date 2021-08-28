import { IsBoolean, IsNumber, IsString } from "class-validator";


export class CreateBoletoDto {
    @IsString()
    empresa: string;

    @IsString()
    vencimento: string;

    @IsNumber()
    valor: number;

    @IsBoolean()
    pago = false;
}