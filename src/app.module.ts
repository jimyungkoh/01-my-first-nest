import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { AccountsModule } from './domains/accounts/accounts.module';
import { UserProfileModule } from './domains/accounts/users/user-profile/user-profile.module';
import { CartsModule } from './domains/carts/carts.module';
import { OrdersModule } from './domains/orders/orders.module';
import { ProductsModule } from './domains/products/products.module';
import { SignedInOnlyGuard } from './guards/signed-in-only.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BrandsModule } from './domains/brands/brands.module';

@Module({
  // 모듈에 필요한 다른 모듈들을 가져옵니다.
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AccountsModule,
    OrdersModule,
    ProductsModule,
    CartsModule,
    UserProfileModule,
    PrismaModule,
    BrandsModule,
  ],

  // 이 모듈에서 사용할 컨트롤러를 정의합니다.
  controllers: [AppController],

  // 이 모듈에서 사용할 서비스(Provider)를 정의합니다.
  // => 의존성을 주입해주는 부분(Controllers에 AppService 넣어줘)
  providers: [AppService, { useClass: SignedInOnlyGuard, provide: APP_GUARD }],

  // exports: [],
  // exports 배열은 이 모듈에서 제공하고 다른 모듈에서 사용할 수 있게 하는 provider들의 목록입니다.
  // 다른 모듈에서 이 모듈을 import할 때, exports에 정의된 provider만이 외부에서 접근 가능합니다.
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
