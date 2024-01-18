import { IBaseService } from "../base/base.service.interface";
import { AccountEntity } from "./entities/account.entity";

export interface IAccountService extends IBaseService<AccountEntity> {}