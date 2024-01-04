import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { UserPaymentEntity } from './user-payment.entity';


/**
 * user_id, first_name, last_name
 * gender, birthday, address, phone,
 */

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'nvarchar', length: 50, nullable: false })
  first_name: string;

  @Column()
  last_name: string;

  @Column() // 225
  avatar_url: string;

  @Column({ type: 'nvarchar', length: 50 })
  gender: string;

  @Column({ nullable: false })
  birthday: Date;

  @Column() // 225
  location: string;

  @Column({ type: 'nvarchar', length: 10, nullable: false })
  phone: string;

  @OneToOne(() => AccountEntity, (account) => account.user) 
  //   (account) =>  account.email{ cascade: true }
  @JoinColumn({ name: 'email' }) // fix here
  account: AccountEntity;

  @OneToOne(() => ProfileEntity, (profile) => profile.user) // , { cascade: true }
  @JoinColumn({ name: 'profile_id' })
  profile: ProfileEntity;

  @OneToOne(() => UserPaymentEntity, (user_payment) => user_payment.user) // , { cascade: true }
  @JoinColumn({ name: 'user_payment_id' })
  user_payment: UserPaymentEntity;
}