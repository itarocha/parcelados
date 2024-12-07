import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartaoDto } from '../../dtos/cartoes/create-cartao.dto';
import { UpdateCartaoDto } from '../../dtos/cartoes/update-cartao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cartao } from 'src/typeorm/entities/cartao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartoesService {

  constructor(@InjectRepository(Cartao) private repo: Repository<Cartao>,
  ){
  }

  create(cartao: CreateCartaoDto) {
    return this.repo.save(cartao);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const model = await this.repo.findOneBy({ id })
    if (!model){
      throw new HttpException(
        'Cartão não encontrado',
        HttpStatus.NOT_FOUND
      )
    }
    return model;
  }

  update(id: number, updateCartaoDto: UpdateCartaoDto) {
    return this.repo.update({ id }, { ...updateCartaoDto });  
  }

  async remove(id: number) {
    const model = await this.repo.findOneBy({ id })
    if (!model){
      throw new HttpException(
        'Cartão não encontrado',
        HttpStatus.NOT_FOUND
      )
    }
    return this.repo.delete( { id })
  }
}
