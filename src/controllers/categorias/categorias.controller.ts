import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { CreateCategoriaDto } from '../../dtos/categorias/create-categoria.dto';
import { UpdateCategoriaDto } from '../../dtos/categorias/update-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoriasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.categoriasService.remove(id);
  }
}
