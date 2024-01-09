import { IBaseService } from "../base/base.interface";
import { AccountEntity } from "./entities/account.entity";

export interface IAccountService extends IBaseService<AccountEntity> {}