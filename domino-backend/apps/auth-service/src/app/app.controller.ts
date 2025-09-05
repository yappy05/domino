import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, LogoutDto, RegisterDto } from '@domino/shared-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('ping')
  test() {
    console.log('pong');
  }

  @MessagePattern('register')
  async handleAuthRegister(@Payload() dto: RegisterDto) {
    return await this.appService.register(dto);
  }

  @MessagePattern('login')
  async handleAuthLogin(@Payload() dto: LoginDto) {
    return this.appService.login(dto);
  }

  @MessagePattern('logout')
  handleAuthLogout(@Payload() dto: LogoutDto) {
    this.appService.logout(dto);
  }
}
