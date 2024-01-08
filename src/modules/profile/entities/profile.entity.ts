import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileAttributeValueEntity } from "./profile.value.entity";
import { AbstractBaseEntity } from "src/modules/base/basa.abstract.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";






/**
 * level
 * occupation
 * created
 * status
 * attribute
 * value
 */
@Entity({name:'Profiles'})
export class ProfileEntity extends AbstractBaseEntity { //
    @PrimaryGeneratedColumn()
    profile_id: number;

    @Column({default: 'NEW_SELLER'})
    level: string;

    @Column()
    occupation: string;

    @OneToMany(
        () => ProfileAttributeValueEntity,
        (profile_attribute_value) => profile_attribute_value.profile,
    )
    profile_attribute_values: ProfileAttributeValueEntity[];

    
    @OneToOne(() => UserEntity, (user) => user.profile) 
    // specify inverse side as a second parameter
    user: UserEntity;
}