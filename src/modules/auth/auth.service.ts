import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { AccountEntity } from '../account/entities/account.entity';
import { AuthDto } from './dtos/auth.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Payload } from 'src/common/constants/types/payload.type';
import { Tokens } from 'src/common/constants/types/tokens.type';
import { IAccountService } from '../account/account.service.interface';
import { AuthExceptionErrors } from 'src/common/constants/errors/auth.error';
import { IUserService } from '../user/user.service.interface';
import { InputError, TypeError } from 'src/common/constants/errors/errors';
import { Role } from 'src/common/constants/enums/role.enum';
import { AccountDto } from '../account/dtos/account.dto';
import { UserEntity } from '../user/entities/user.entity';
dotenv.config();

const ACCESS_TOKEN_TIME = 60 * 15;
const REFRESH_TOKEN_TIME = 60 * 60;

@Injectable()
export class AuthService implements IAuthService{
    constructor(
        // @Inject(CACHE_MANAGER) private cacheService: Cache,
        private jwtService: JwtService,
        @Inject('IAccountService')
        private accountService: IAccountService,
        @Inject('IUserService')
        private userService: IUserService,
    ){}

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, '10');
    }

    async comparePassword(
        password: string,
        storePasswordHash: string,
    ): Promise<any> {
        return await bcrypt.compare(password, storePasswordHash);
    }
    
    calculateExpirationTime(expirationInSeconds: number): number {
        const now = new Date();
        const expirationTime =  (now.getTime() + expirationInSeconds * 1000);
        return expirationTime;
    }

    // gettoken -> [access,refresh] -> create sign
    async getTokens(payload: Payload): Promise<Tokens> {
        const [jwt, refresh] = await Promise.all([
            this.jwtService.signAsync(
                { payload },
                {
                    secret: process.env.JWT_SECRET_KEY,
                    expiresIn: ACCESS_TOKEN_TIME,
                },
            ),
            this.jwtService.signAsync(
                { payload },
                {
                    secret: process.env.REFRESH_JWT_SECRET_KEY,
                    expiresIn: REFRESH_TOKEN_TIME, // 60 * 60 * 24
                },
            ),
        ]);

        return {
            access_token: jwt,
            refresh_token: refresh,
        };
    }


    // đăng nhập
    public async login(data: AuthDto): Promise<any> {
        const findAccount: AccountEntity = await this.accountService.getOneById(data.email);

        if (findAccount) {
            const checkPass = await this.comparePassword(
                data.password,
                findAccount.password,
            );
        if (!checkPass) {
            console.log('password wrong!');
            // throw new AuthException(AuthExceptionMessages.PASSWORD_WRONG);
            return { message: AuthExceptionErrors.PASSWORD_WRONG };
        }
        } else {
            // throw new AuthException(AuthExceptionMessages.LOGIN_INVAILD);
            return { message: AuthExceptionErrors.LOGIN_INVAILD };
        }

        // write infor put in Payload
        const payload: Payload = {
            email: data.email,
            role: (await Promise.resolve(findAccount.role)).name, // promise
            exp: this.calculateExpirationTime(ACCESS_TOKEN_TIME),
        };

        const tokens: Tokens = await this.getTokens(payload);
        findAccount.refresh_token = tokens.refresh_token;
        await this.accountService.updateOneById(findAccount.email, findAccount);

        const userInfo = await this.userService.getUserByEmail(data.email);

        return {
            access_token: tokens.access_token,
            first_name: userInfo.first_name,
        };
    }

    logout(email: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
        // đăng kí tài khoản -> Done!
    public async register(data: RegisterDto): Promise<any> {
        console.log('registerCustomer', data);
        const accountExists = await this.accountService.getOneById(data.email);

        if (accountExists) {
        // throw new Error
        return { message: InputError.EMAIL_EXSIT }; // Nếu email không tồn tại, ném ra lỗi NOT_FOUND
        }

        try {
            // hash pass
            data.password = await bcrypt.hash(data.password, 12);

        // create account
        const createAccount = await this.accountService.createOne({
            email: data.email,
            password: data.password,
        });

        const tokens = await this.getTokens({
            email: createAccount.email,
            role: Role.User,
            exp: this.calculateExpirationTime(ACCESS_TOKEN_TIME),
        });

        const update = new AccountDto(
            createAccount.email,
            true,
            tokens.refresh_token,
            createAccount.password,
            Role.User,
            null,
        );

        const updateAccount: AccountEntity =
            await this.accountService.updateOneById(createAccount.email, update);
        console.log(createAccount);

        const createUser: UserEntity = await this.userService.createOne({
            first_name: data.first_name,
            last_name: data.last_name,
            avatar_url: '',
            gender: data.gender,
            birthday: data.birthday,
            address: '',
            phone: data.phone,
            account: updateAccount,
        });

        return {
            access_token: tokens.access_token,
            first_name: createUser.first_name,
        };
        } catch (error) {
        console.log('ĐĂNG KÝ::::', error);
        throw new Error(TypeError.NO_SUCCESS);
        }
    }
}
