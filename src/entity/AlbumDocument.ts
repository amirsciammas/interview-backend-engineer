import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm'
import {UserDocument} from './UserDocument';
import {ImageDocument} from './ImageDocument';

/** The definition of an album document. */
@Entity('albums')
export class AlbumDocument {
    /** The ID of the album. */
    @PrimaryGeneratedColumn()
    id: number

    /** The title of the album. */
    @Column()
    title: string

    /** The user to whom the album belongs. */
    @ManyToOne(() => UserDocument, (user) => user.albums)
    user: UserDocument

    /** The images associated with the album. */
    @OneToMany(() => ImageDocument, (image) => image.album)
    images: ImageDocument[]
}
