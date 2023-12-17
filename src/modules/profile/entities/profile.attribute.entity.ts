import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProfileAttributeValueEntity } from "./profile.value.entity";



@Entity({name:'ProfileAttributes'})
export class ProfileAttributeEntity {
    @PrimaryGeneratedColumn()
    profile_attribute_id: number

    @Column({nullable: false})
    profile_attribute_name: string;
    /**
     * Ex: 
     * 1. education, 
     * 2. skill,
     * 3. experence
     */

    
    @OneToMany(
        () => ProfileAttributeValueEntity,
        (profile_attribute_value) => profile_attribute_value.profile_attribute,
    )
    profile_attribute_values: ProfileAttributeValueEntity[];
}