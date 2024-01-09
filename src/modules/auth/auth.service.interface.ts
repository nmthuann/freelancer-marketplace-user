import { Payload } from "src/common/constants/types/payload.type";
import { AccountEntity } from "../account/entities/account.entity";
import { AuthDto } from "./dtos/auth.dto";
import { RegisterDto } from "./dtos/register.dto";
import { Tokens } from "src/common/constants/types/tokens.type";

/**
 * 1. login.
 * 2. logout.
 * 3. forgot password.
 * 4. change password.
 * 5. register.
 */
export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, storePassHash: string): Promise<any>;
    login(data: AuthDto): Promise<any>;
    logout(email: string): Promise<boolean>;
    register(data: RegisterDto): Promise<AccountEntity>;
    getTokens(payload: Payload): Promise<Tokens>;
    calculateExpirationTime(expirationInSeconds: number): number;
}


