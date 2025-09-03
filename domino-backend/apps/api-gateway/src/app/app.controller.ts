import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { API_CLIENT, AUTH_QUEUE } from '../../shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from '@domino-backend/utils';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(API_CLIENT) private readonly apiClient: ClientProxy
  ) {}

  @Get()
  async getData() {
    this.apiClient.emit('ping', {})
    return this.appService.getData();
  }

  @Post()
  async register(@Body() data: RegisterDto) {
    this.apiClient.emit('register', data)
  }
}
