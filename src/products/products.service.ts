import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { where } from 'sequelize';
import { log } from 'node:console';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product) private model: typeof Product) {}

  async create(createProductDto: Partial<CreateProductDto>): Promise<Product> {
    const newProduct = await this.model.create(createProductDto);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.model.findAll();

    return products;
  }

  async findOne(id: number) {
    const foundProduct = await this.model.findOne({
      where: { id },
      paranoid: false,
    });

    return foundProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.model.update(updateProductDto, {
      where: { id },
      returning: true,
    });

    return product[1][0];
  }

  async remove(id: number) {
    const foundProduct = await this.findOne(id);

    if (!foundProduct) {
      return {
        data: null,
        message: 'product not found',
        statusCode: HttpStatus.NOT_FOUND,
      };
    }
    
    return await foundProduct.destroy();
  }
}
