import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './modulos/categorias.module';
import { CardsModule } from './modulos/cartoes.module';
import { Categoria } from './typeorm/entities/categoria.entity';
import { Cartao } from './typeorm/entities/cartao.entity';
import { ComprasModule } from './modulos/compras.module';
import { Compra } from './typeorm/entities/compra.entity';
import { Parcela } from './typeorm/entities/parcela.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'parcelados',
      entities: [Categoria, Cartao, Compra, Parcela],
      synchronize: true,
    }),
    CategoriasModule,
    CardsModule,
    ComprasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
