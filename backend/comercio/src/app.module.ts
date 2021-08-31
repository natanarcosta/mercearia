import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoletosModule } from './boletos/boletos.module';
import { Boleto } from './shared/entities/boleto.entity';
import { User } from './shared/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BoletosModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'boletos.sqlite',
      entities: [Boleto, User],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
