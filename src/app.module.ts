import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AccountEntity } from './modules/account/account.entity';
import { UserEntity } from './modules/user/entities/user.entity';
import { ProfileEntity } from './modules/profile/entities/profile.entity';
import { ProfileAttributeEntity } from './modules/profile/entities/profile.attribute.entity';
import { ProfileAttributeValueEntity } from './modules/profile/entities/profile.value.entity';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password:  process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [
          AccountEntity,
          UserEntity,
          ProfileEntity,
          ProfileAttributeEntity,
          ProfileAttributeValueEntity,
        ],
        synchronize: true, // fix: false -> migration
      }),
      // AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
