import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên hiển thị không được để trống'})
  name: string;

  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống'})
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống'})
  password: string;
}
