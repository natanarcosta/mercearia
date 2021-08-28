import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletosModule } from './boletos/boletos.module';
import { Boleto } from './boletos/entities/boleto.entity';


@Module({
  imports: [BoletosModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'boletos.sqlite',
    entities: [Boleto],
    synchronize: true
  })],
  controllers: [AppController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true,
    })
  }],
})
export class AppModule {}
