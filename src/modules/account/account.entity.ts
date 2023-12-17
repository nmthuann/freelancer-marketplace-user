
import { Entity,  Column, CreateDateColumn, DeepPartial, PrimaryColumn, BeforeInsert, JoinColumn, OneToOne, AfterUpdate, AfterInsert } from "typeorm"
import { BaseEntity } from "../base/base.entity";
import { Role } from "src/common/constants/enums/role.enum";
import { UserEntity } from "../user/user.entity";


@Entity({name:'Accounts'})
export class AccountEntity extends BaseEntity { 

    @PrimaryColumn({length: 50})
    email: string

    @Column({nullable: false}) //select: false
    password: string

    @Column({ default: true }) // 0: false  1: true
    status: boolean;

    @Column({default: null})
    refresh_token: string;

    @Column({default: Role.User}) 
    role: string

    @OneToOne(() => UserEntity, (user) => user.account) // { cascade: true }
    user: UserEntity;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    } 
}