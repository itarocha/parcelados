import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from '../../dtos/categorias/create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}
