// Role.entity.ts

import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { AbstractBaseEntity } from 'src/modules/base/basa.abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';



@Entity({ name: 'AuthMethods' })// { name: 'roles' }
export class AuthMethodEntity {
  @PrimaryGeneratedColumn()
  auth_method_id: number;

  @Column({nullable: false})
  auth_method_name: string;

  @Column()
  description: string;

  @OneToMany(
        () => AccountEntity,
        (account) => account.auth_method,
    )
    accounts: AccountEntity[];
}
