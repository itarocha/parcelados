import { Module } from '@nestjs/common';
import { CartoesController } from '../controllers/cartoes/cartoes.controller';
import { CartoesService } from '../services/cartoes/cartoes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cartao } from 'src/typeorm/entities/cartao.entity';
import { Parcela } from 'src/typeorm/entities/parcela.entity';
import { Compra } from 'src/typeorm/entities/compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cartao])],
  controllers: [CartoesController],
  providers: [CartoesService],
  exports: [TypeOrmModule]
})
export class CardsModule {}
