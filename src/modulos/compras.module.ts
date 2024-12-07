import { Module } from '@nestjs/common';
import { ComprasService } from '../services/compras/compras.service';
import { ComprasController } from '../controllers/compras/compras.controller';
import { Compra } from 'src/typeorm/entities/compra.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcela } from 'src/typeorm/entities/parcela.entity';
import { Cartao } from 'src/typeorm/entities/cartao.entity';
import { Categoria } from 'src/typeorm/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Compra, Parcela, Cartao, Categoria])],
  controllers: [ComprasController],
  providers: [ComprasService],
  exports: [TypeOrmModule]
})
export class ComprasModule {}
