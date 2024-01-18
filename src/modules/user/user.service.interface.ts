import { IBaseService } from "../base/base.service.interface";
import { UserEntity } from "./entities/user.entity";

export interface IUserService extends IBaseService<UserEntity> {
    getUserByEmail(email: string): Promise<UserEntity>;
}