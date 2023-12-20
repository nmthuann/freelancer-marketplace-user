import { Level } from "src/common/constants/enums/level.enum";
import { BaseEntity } from "src/modules/base/base.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileAttributeValueEntity } from "./profile.value.entity";
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
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    profile_id: number;

    @Column({default: Level.NEW_SELLER})
    level: string;

    @Column()
    occupation: string;

    @Column()
    status: string;

    @OneToMany(
        () => ProfileAttributeValueEntity,
        (profile_attribute_value) => profile_attribute_value.profile,
    )
    profile_attribute_values: ProfileAttributeValueEntity[];

    
    @OneToOne(() => UserEntity, (user) => user.profile) // specify inverse side as a second parameter
    user: UserEntity;
}