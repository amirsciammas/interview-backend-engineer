import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {AlbumDocument} from './AlbumDocument';

/** The definition of a user document. */
@Entity('users')
export class UserDocument {
    /** The ID of the user. */
    @PrimaryGeneratedColumn()
    id: number

    /** The name of the user. */
    @Column()
    name: string

    /** The email of the user. */
    @Column()
    email: string

    /** The latitude position associated with the user current address. */
    @Column()
    address_geo_lat: number

    /** The longitude position associated with the user current address. */
    @Column()
    address_geo_lng: number

    /** The albums owned by the user. */
    @OneToMany(() => AlbumDocument, (album) => album.user)
    albums: AlbumDocument[]
}
