import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginAccountDto: LoginAccountDto) {
    return this.authService.login(loginAccountDto);
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateAccountDto) {
    return this.authService.register(createUserDto);
  }
}
