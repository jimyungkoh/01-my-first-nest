import { IsNumber } from 'class-validator';

export class CartAddItemDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  productId: number;
}
