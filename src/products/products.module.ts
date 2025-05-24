import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService], 
  imports: [SequelizeModule.forFeature([Product])],
})
export class ProductsModule {}
