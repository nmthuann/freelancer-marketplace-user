// Role.entity.ts

import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { AbstractBaseEntity } from 'src/modules/base/basa.abstract.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';



@Entity({ name: 'roles' })// { name: 'roles' }
export class RoleEntity extends AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({nullable: false})
  name: string;

  @OneToMany(
        () => AccountEntity,
        (account) => account.role,
    )
    accounts: AccountEntity[];
}
