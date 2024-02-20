import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const rawData = fs.readFileSync(
  './src/database/prisma/seed-data.json',
  'utf-8',
);
const data = JSON.parse(rawData);

const prismaClient = new PrismaClient();

async function seed() {
  const products = data.products;

  await Promise.all([seedProducts(products)]);
}

seed().finally(async () => {
  await prismaClient.$disconnect();
});

async function seedProducts(products: any[]) {
  for (const product of products) {
    await prismaClient.product.upsert({
      where: { id: Number(product.id) },
      update: {},
      create: {
        id: Number(product.id),
        name: product.goodsnm.trim(),
        imgSrc: product.img_i,
        deliveryType: '로켓배송',
        onlineStock: 9999,
        originalPrice: product.standard_price,
        price: product.price,
        brand: {
          connectOrCreate: {
            where: { id: product.brand.id },
            create: {
              id: product.brand.id,
              nameEn: product.brand.name.trim(),
              nameKr: product.brand.kr_name.trim(),
            },
          },
        },
      },
    });
  }
}
