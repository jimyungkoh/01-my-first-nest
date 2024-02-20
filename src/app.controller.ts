import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // private readonly? 해당 클래스에서 appService에 대해서 읽기만 가능 나머지는 전부 불허
  constructor(private readonly appService: AppService) {
    // private readonly가 있으면 this.appService로 = appService 안 써도 되
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
