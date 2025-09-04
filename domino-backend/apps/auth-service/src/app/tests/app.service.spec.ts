import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, UserResponse } from '@domino-backend/utils';

const mockJwtService = {
  signAsync: jest.fn()
}

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('AppService', () => {

  let service: AppService
  let jwtService: typeof mockJwtService
  let prismaService: typeof mockPrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {provide: JwtService, useValue: mockJwtService},
        {provide: PrismaService, useValue: mockPrismaService}
      ]
    }).compile()

    service = module.get<AppService>(AppService);
    jwtService = module.get(JwtService)
    prismaService = module.get(PrismaService)

    jest.clearAllMocks()

  })

  describe('register', () => {
    const mockRegisterDto: RegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    }

    const mockUser = {
      id: '1',
      ...mockRegisterDto,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const mockTokens = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };

    it('should successfully register a new user', async () => {
      prismaService.user.findUnique.mockResolvedValue(null)
      prismaService.user.create.mockResolvedValue(mockUser)
      prismaService.user.update.mockResolvedValue(mockUser)

      jwtService.signAsync.mockResolvedValueOnce('access-token').mockResolvedValueOnce('refresh-token')

      const result = await service.register(mockRegisterDto)

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: {email: mockRegisterDto.email}
      })

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: mockRegisterDto,
      })
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: {id: mockUser.id},
        data: {refreshToken: mockTokens.refreshToken}
      })

      expect(result).toEqual(mockUser)
    })

  })

})

