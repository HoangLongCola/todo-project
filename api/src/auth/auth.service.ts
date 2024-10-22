import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { LoginAccountDto } from './dto/login-account.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.findUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(loginAccountDto: LoginAccountDto) {
    const result = await this.validateUser(loginAccountDto.username, loginAccountDto.password);
    if (!result) throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    const payload = { username: result.username, sub: result.id, name: result.name };
    return {
      access_token: this.jwtService.sign(payload),
      data: payload
    };
  }

  async register(createAccountDto: CreateAccountDto) {
    const user = await this.userService.findUsername(createAccountDto.username);
    if (user) throw new ConflictException('Tài khoản đã tồn tại');

    const hash = await bcrypt.hash(createAccountDto.password, 10);
    return this.userService.create({
      name: createAccountDto.name,
      username: createAccountDto.username,
      password: hash,
    });
  }
}
