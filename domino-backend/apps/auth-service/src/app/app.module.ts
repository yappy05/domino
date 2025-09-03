import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule, PrismaModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.getOrThrow<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.getOrThrow<string>('JWT_ACCESS_EXPIRES')
      }
    }),
    inject: [ConfigService]
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
