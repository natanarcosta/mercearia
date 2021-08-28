import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBoletoDto{
    @IsString()
    @IsOptional()
    empresa: string;

    @IsString()
    @IsOptional()
    vencimento: string;

    @IsNumber()
    @IsOptional()
    valor: number;

    @IsBoolean()
    @IsOptional()
    pago: boolean;
}