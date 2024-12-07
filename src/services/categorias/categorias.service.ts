import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from '../../dtos/categorias/create-categoria.dto';
import { UpdateCategoriaDto } from '../../dtos/categorias/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../../typeorm/entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {

  constructor(
    @InjectRepository(Categoria) private repo: Repository<Categoria>,
  ){
  }

  create(categoria: CreateCategoriaDto) {
    return this.repo.save(categoria)
  }

  findAll() {
    return this.repo.find({
      order:{
        descricao: 'ASC' 
      }
    })
  }

  async findOne(id: number) {
    const model = await this.repo.findOneBy({ id })
    if (!model){
      throw new HttpException(
        'Categoria não encontrada',
        HttpStatus.NOT_FOUND
      )
    }
    return model;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  async remove(id: number) {
    const model = await this.repo.findOneBy({ id })
    if (!model){
      throw new HttpException(
        'Categoria não encontrada',
        HttpStatus.NOT_FOUND
      )
    }
    return this.repo.delete( { id })
  }
}
