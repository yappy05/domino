import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JwtPayload,
  JwtTokens,
  RegisterDto,
  UserResponse,
} from '@domino-backend/utils';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  public async register(dto: RegisterDto): Promise<UserResponse> {
    const isExist = await this.findByEmail(dto.email)
    console.log(isExist)
    if (isExist) throw new RpcException({code: status.ALREADY_EXISTS, message: 'Пользователь с такой почтой уже существует'})
    const {name, email, password} = dto

    const user = await this.prismaService.user.create({ data: { name, email, password } });
    console.log(user)
    const tokens = await this.generateTokens({username: user.name, sub: user.id})
    await this.updateRefreshTokenInDatabase(user.id, tokens.refreshToken)
    return user
  }

  private async generateTokens(payload: JwtPayload): Promise<JwtTokens> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);
    return { accessToken, refreshToken };
  }

  private async updateRefreshTokenInDatabase(userId: string, refreshToken: string) {
    await this.prismaService.user.update({
      where: {id: userId},
      data: {refreshToken}
    })
  }

  private async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
