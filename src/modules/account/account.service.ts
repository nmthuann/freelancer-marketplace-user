import { Injectable } from '@nestjs/common';
import { IAccountService } from './account.service.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { BaseService } from '../base/base.abstract.service';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService
  extends BaseService<AccountEntity>
  implements IAccountService
{
    constructor(
        @InjectRepository(AccountEntity)
        accountRepository: Repository<AccountEntity>,
    ) {
        super(accountRepository);
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    async getOneById(id: string | number | ObjectId): Promise<any> {
        return;
    }

}