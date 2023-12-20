import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'UserPayments' })
export class UserPaymentEntity {
    @PrimaryColumn('uuid')
    user_payment_id: string; // mã hóa

    @Column({nullable: false})
    card_number: string; // mã hóa

    @Column({nullable: false})
    cardholder_name: string;

    @Column({nullable: false})
    expired: Date;

    @Column({nullable: false})
    cvv: string; // mã hóa

    @Column({nullable: false})
    country: string;

    @OneToOne(() => UserEntity, (user) => user.user_payment)
    user: UserEntity;
}