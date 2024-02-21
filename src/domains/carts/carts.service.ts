import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class CartsService {
  async getCartByUserId(userId: number) {
    return await this.prismaService.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { product: { include: { brand: true } } } },
      },
    });
  }
  constructor(private readonly prismaService: PrismaService) {}

  async addItemToCart(userId: number, productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    return await this.prismaService.cartItem.upsert({
      where: { cartId_productId: { cartId: userId, productId } },
      create: { cartId: userId, productId, quantity: 1 },
      update: { quantity: { increment: 1 } },
    });
  }

  async removeItemFromCart(userId: number, productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    const cartItem = await this.prismaService.cartItem.update({
      where: { cartId_productId: { cartId: userId, productId } },
      data: { quantity: { decrement: 1 } },
    });

    if (cartItem.quantity === 0)
      return this.clearItemsFromCart(userId, productId);

    return cartItem;
  }

  async clearItemsFromCart(userId: number, productId: number) {
    if (!productId) throw new BadRequestException('productId is required');

    return await this.prismaService.cartItem.delete({
      where: { cartId_productId: { cartId: userId, productId } },
    });
  }
}
