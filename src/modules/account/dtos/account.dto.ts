// import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants/enums/role.enum';
import { UserDto } from 'src/modules/user/dtos/user.dto';


export class AccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  status: boolean;
  refresh_token: string;
  role: Role;
  // @IsNotEmpty()
  // @Exclude({
  //     toPlainOnly: true
  // })
  password!: string;
  user: UserDto;

  constructor(
    email: string,
    status: boolean,
    refresh_token: string,
    password: string,
    role: Role,
    user: UserDto,
  ) {
    this.email = email;
    this.status = status;
    this.refresh_token = refresh_token;
    this.password = password;
    this.role = role;
    this.user = user;
  }

  // This method transforms a User class instance to a plain object
  toPlainObject() {
    const { email, status, refresh_token, role } = this;
    return { email, status, refresh_token, role };
  }
}