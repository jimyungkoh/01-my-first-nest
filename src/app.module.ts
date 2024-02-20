import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { AccountsModule } from './domains/accounts/accounts.module';
import { UserProfileModule } from './domains/accounts/users/user-profile/user-profile.module';
import { CartsModule } from './domains/carts/carts.module';
import { OrdersModule } from './domains/orders/orders.module';
import { ProductsModule } from './domains/products/products.module';

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
  ],

  // 이 모듈에서 사용할 컨트롤러를 정의합니다.
  controllers: [AppController],

  // 이 모듈에서 사용할 서비스(Provider)를 정의합니다.
  // => 의존성을 주입해주는 부분(Controllers에 AppService 넣어줘)
  providers: [AppService],

  // exports: [],
  // exports 배열은 이 모듈에서 제공하고 다른 모듈에서 사용할 수 있게 하는 provider들의 목록입니다.
  // 다른 모듈에서 이 모듈을 import할 때, exports에 정의된 provider만이 외부에서 접근 가능합니다.
})
export class AppModule {}
