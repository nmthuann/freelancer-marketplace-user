import {
  Controller,
  Get,
} from '@nestjs/common';
import { IAccountService } from './account.service.interface';

@Controller('account')
export class AccountController {
    // constructor(
    //     @Inject('IAccountService')
    //     accountService: IAccountService
    // ) {}

    @Get()
    getHelloAccountModule(): string {
        return "Hello Account Module.";
    }
}