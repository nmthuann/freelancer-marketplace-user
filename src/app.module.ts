import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AccountEntity } from './modules/account/entities/account.entity';
import { UserEntity } from './modules/user/entities/user.entity';
import { ProfileEntity } from './modules/profile/entities/profile.entity';
import { ProfileAttributeEntity } from './modules/profile/entities/profile.attribute.entity';
import { ProfileAttributeValueEntity } from './modules/profile/entities/profile.value.entity';
import { UserPaymentEntity } from './modules/user/entities/user-payment.entity';
import { AppDataSource } from './datasource';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
