import { createZodDto } from 'nestjs-zod';
import {UserLoginRequestSchema} from 'zod-types'

export class LoginZodDto extends createZodDto(UserLoginRequestSchema){}
