import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  NotFoundException,
  Param,
  Post,
  Res,
  UseFilters,
  UseGuards
} from '@nestjs/common';
import { AppService } from './app.service';
import { API_CLIENT, AUTH_QUEUE } from '../../shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from '@domino-backend/utils';
import {Response} from 'express';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { AuthGuard } from '@nestjs/passport';


@Controller()
@UseFilters(AllExceptionFilter)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(API_CLIENT) private readonly apiClient: ClientProxy
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getData() {
    this.apiClient.emit('ping', {})
    return this.appService.getData();
  }

  @Get('/error')
  getError(){
    throw new NotFoundException('тестовая ошибка')
  }

  @Post('auth/register')
  async register(@Res({passthrough: true}) res: Response, @Body() dto: RegisterDto) {
    return await this.appService.register(res, dto)
  }
  @Post('auth/login')
  async login (@Res({passthrough: true}) res: Response, @Body() dto: LoginDto) {
    return await this.appService.login(res, dto)
  }
  @Post('auth/logout/:id')
  logout(@Res({passthrough: true}) res: Response, @Param('id') userId: string) {
    return this.appService.logout(res, {userId})
  }
}
