import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartoesService } from '../../services/cartoes/cartoes.service';
import { CreateCartaoDto } from '../../dtos/cartoes/create-cartao.dto';
import { UpdateCartaoDto } from '../../dtos/cartoes/update-cartao.dto';

@Controller('cartoes')
export class CartoesController {
  constructor(private readonly cartoesService: CartoesService) {}

  @Post()
  create(@Body() createCartaoDto: CreateCartaoDto) {
    return this.cartoesService.create(createCartaoDto);
  }

  @Get()
  findAll() {
    return this.cartoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cartoesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCartoDto: UpdateCartaoDto) {
    return this.cartoesService.update(id, updateCartoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.cartoesService.remove(+id);
  }
}
