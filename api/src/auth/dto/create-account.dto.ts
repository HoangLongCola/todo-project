import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Tên hiển thị không được để trống'})
  name: string;

  @IsNotEmpty({ message: 'Tài khoản không được để trống'})
  username: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống'})
  password: string;
}
