import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { SignedInOnly } from 'src/decorators/signed-in-only.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SignedInOnly()
  async getProducts(@DUser() user: User) {
    console.log(user);
    return await this.productsService.getProducts();
  }

  @Get(':productId')
  async getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return await this.productsService.getProduct(productId);
  }
}
