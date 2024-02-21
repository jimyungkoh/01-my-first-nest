import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { SignedInOnly } from 'src/decorators/signed-in-only.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  @SignedInOnly()
  async getCart(@DUser() user: User) {
    return await this.cartsService.getCartByUserId(user.id);
  }

  @Post('products/:productId')
  @SignedInOnly()
  async addItemToCart(
    @DUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const cartItem = await this.cartsService.addItemToCart(user.id, productId);
    return cartItem;
  }

  @Delete('products/:productId')
  @SignedInOnly()
  async removeItemFromCart(
    @DUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const cartItem = await this.cartsService.removeItemFromCart(
      user.id,
      productId,
    );
    return cartItem;
  }

  @Delete('products/:productId/clear')
  @SignedInOnly()
  async clearItemInCart(
    @DUser() user: User,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const cartItem = await this.cartsService.clearItemsFromCart(
      user.id,
      productId,
    );
    return cartItem;
  }
}
