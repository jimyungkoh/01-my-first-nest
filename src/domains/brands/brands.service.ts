import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBrands() {
    const brands = await this.prismaService.brand.findMany();
    return brands;
  }

  async getBrandById(brandId: number) {
    const brand = await this.prismaService.brand.findUnique({
      where: { id: brandId },
      include: { products: true },
    });
    return brand;
  }
}
