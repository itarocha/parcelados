import { Module } from '@nestjs/common';
import { CategoriasService } from '../services/categorias/categorias.service';
import { CategoriasController } from '../controllers/categorias/categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../typeorm/entities/categoria.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports: [TypeOrmModule]
})
export class CategoriasModule {}
