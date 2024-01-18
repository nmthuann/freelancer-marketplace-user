
import { 
    Entity,  
    Column,  
    PrimaryColumn, 
    BeforeInsert, 
    JoinColumn, 
    OneToOne, 
    AfterUpdate, 
    AfterInsert, 
    OneToMany, 
    ManyToOne
} from "typeorm"

import { UserEntity } from "../../user/entities/user.entity";
import { RoleEntity } from "../../user/entities/role.entity";
import { AbstractBaseEntity } from "src/modules/base/basa.abstract.entity";
import { AuthMethodEntity } from "./auth-method.entity";



@Entity({name:'Accounts'})
export class AccountEntity extends AbstractBaseEntity { 

    @PrimaryColumn({length: 50})
    email: string

    @Column({nullable: false}) //select: false
    password: string

    @Column({ default: true }) // 0: false  1: true
    status: boolean;

    @Column({default: null})
    refresh_token: string;

    @Column()
    sub: string;


    @ManyToOne(
        () => RoleEntity, 
        (role) => role.accounts, {
        eager: true,
    }) 
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;


    @ManyToOne(
        () => AuthMethodEntity, 
        (auth_method) => auth_method.accounts, {
        eager: true,
    }) 
    @JoinColumn({ name: 'auth_method_id' })
    auth_method: AuthMethodEntity;


    @OneToOne(() => UserEntity, (user) => user.account) // { cascade: true }
    user: UserEntity;

    @BeforeInsert()
    emailToLowerCase(){
        this.email = this.email.toLowerCase();
    } 
}