import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from '@domino-backend/utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping')
  test() {
    console.log('pong')
  }

  @MessagePattern('register')
  async handleAuthRegister (@Payload() data: RegisterDto) {
    return await this.appService.register(data)
  }
}
