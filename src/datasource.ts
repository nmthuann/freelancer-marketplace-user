import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { AccountEntity } from './modules/account/entities/account.entity';
import { UserPaymentEntity } from './modules/user/entities/user-payment.entity';
import { UserEntity } from './modules/user/entities/user.entity';
import { ProfileEntity } from './modules/profile/entities/profile.entity';
import { ProfileAttributeEntity } from './modules/profile/entities/profile.attribute.entity';
import { ProfileAttributeValueEntity } from './modules/profile/entities/profile.value.entity';
import { RoleEntity } from './modules/user/entities/role.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    // __dirname + '/modules/**/!(*base).entity{.ts,.js}'
    AccountEntity,
     UserEntity,
     UserPaymentEntity,
     RoleEntity,
          ProfileEntity,
          ProfileAttributeEntity,
          ProfileAttributeValueEntity,
  ],
  //__dirname+'/modules/**/*.entity{.ts,.js}'
  logging: false,
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname+'/migrations/*{.ts,.js}'],
  // migrationsTableName: 'history',__dirname+'/migrations/*{.ts,.js}'
})
