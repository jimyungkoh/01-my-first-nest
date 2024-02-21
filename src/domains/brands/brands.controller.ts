import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  getBrands() {
    return this.brandsService.getBrands();
  }

  @Get(':id')
  getBrandById(@Param('id', ParseIntPipe) brandId: number) {
    return this.brandsService.getBrandById(brandId);
  }
}
