import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { hash, verify } from 'argon2';
import { JwtPayload, JwtTokens, LoginDto, LogoutDto, RegisterDto } from '@domino/shared-types';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  public async register(dto: RegisterDto): Promise<JwtTokens> {
    const isExist = await this.findByEmail(dto.email)
    console.log(isExist)
    if (isExist) throw new RpcException({code: status.ALREADY_EXISTS, message: 'Пользователь с такой почтой уже существует'})
    const {name, email, password} = dto
    const hashPassword = await hash(password, {hashLength: 32})
    const user = await this.prismaService.user.create({ data: { name, email, password: hashPassword } });
    console.log(user)
    const tokens = await this.generateTokens({username: user.name, sub: user.id})
    await this.updateRefreshTokenInDatabase(user.id, tokens.refreshToken)
    return tokens
  }

  public async login(dto: LoginDto): Promise<JwtTokens> {
    const {email, password} = dto
    const user = await this.findByEmail(email)
    if (!user)
      throw new RpcException({code: status.NOT_FOUND, message: 'неверно введеные данные'})
    const isCorrectPass = await verify(user.password, password)
    if (!isCorrectPass)
      throw new RpcException({code: status.NOT_FOUND, message: 'неверно введеные данные'})
    const tokens = await this.generateTokens({username: user.name, sub: user.id})
    this.updateRefreshTokenInDatabase(user.id, tokens.refreshToken).catch(e => console.log('не удалось обновить refresh токен: ', e))
    return tokens
  }

  public logout(dto: LogoutDto): void {
    const {userId} = dto
    this.updateRefreshTokenInDatabase(userId, null).catch(e => console.log('не удалось обновить refresh токен: ', e))
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
