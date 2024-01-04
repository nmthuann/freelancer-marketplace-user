import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfileAttributeEntity } from "./profile.attribute.entity";
import { ProfileEntity } from "./profile.entity";



@Entity({name:'ProfileAttributeValues'})
export class ProfileAttributeValueEntity {
    @PrimaryGeneratedColumn()
    profile_value_id: number;

    @Column({nullable: false})
    profile_value: string;

    // FK: entity
    @ManyToOne(() => ProfileEntity, (profile) => profile.profile_attribute_values, {
        eager: true,
        
    }) //
    @JoinColumn({ name: 'profile_id' })
    profile: ProfileEntity;

    // FK: attribute
    @ManyToOne(
        () => ProfileAttributeEntity, 
        (profile_attribute) => profile_attribute.profile_attribute_values, {
        eager: true,
    }) 
    @JoinColumn({ name: 'profile_attribute_id' })
    profile_attribute: ProfileAttributeEntity;



}