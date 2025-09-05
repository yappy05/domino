import { Inject, Injectable } from '@nestjs/common';

import { API_CLIENT } from '../../shared/constants';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {Response} from 'express';
import { JwtTokens, LoginDto, LogoutDto, RegisterDto } from '@domino/shared-types';



@Injectable()
export class AppService {
  constructor(@Inject(API_CLIENT) private readonly apiClient: ClientProxy) {
  }
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  async register (res: Response, dto: RegisterDto): Promise<JwtTokens> {
    const response: JwtTokens = await firstValueFrom(this.apiClient.send('register', dto))
    const {refreshToken} = response
    res.cookie('refreshToken', refreshToken, {httpOnly: false, secure: false, sameSite: 'lax'})
    return response
  }
  async login(res: Response, dto: LoginDto): Promise<JwtTokens> {
    const response: JwtTokens = await firstValueFrom(this.apiClient.send('login', dto))
    const {refreshToken} = response
    res.cookie('refreshToken', refreshToken)
    return response
  }

  logout(res: Response, dto: LogoutDto) {
    this.apiClient.emit('logout', dto)
    res.clearCookie('refreshToken')
    return true
  }
}
