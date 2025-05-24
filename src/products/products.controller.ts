import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productsService.create(createProductDto);

    return { data: product, message: 'Product created successfully' };
  }

  @Get()
  async findAll() {
    const products = await this.productsService.findAll();

    return {
      data: products,
      message: 'Products got successfully',
      statusCode: 200,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);

    if (!product) {
      return { data: null, message: 'Product not found', statusCode: 404 };
    }

    return {
      data: product,
      message: 'Product found successfully',
      statusCode: 200,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const foundProduct = await this.productsService.findOne(+id);

    if (!foundProduct) {
      return {
        data: null,
        message: 'Product not found',
        statusCode: 404,
      };
    }

    const product = await this.productsService.update(+id, updateProductDto);

    return {
      data: product,
      message: 'Product updated successfully',
      statusCode: 200,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const product: any = await this.productsService.remove(+id);

    if (product.statusCode === 404) {
      return product;
    } else {
      return {
        data: product,
        message: 'Product deleted successfully',
        statusCode: 204,
      };
    }
  }
}
