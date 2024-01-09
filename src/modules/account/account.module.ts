import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountEntity } from './entities/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    providers: [
        {
        provide: 'IAccountService',
        useClass: AccountService,
        },
    ],
    exports: ['IAccountService'],
})
export class AccountModule {}