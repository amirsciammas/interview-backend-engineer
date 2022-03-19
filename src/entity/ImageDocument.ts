import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {AlbumDocument} from './AlbumDocument';

/** The definition of an album image document. */
@Entity('images')
export class ImageDocument {
    /** The ID of the image. */
    @PrimaryGeneratedColumn()
    id: number

    /** The album to which the image belongs. */
    @ManyToOne(() => AlbumDocument, (album) => album.images)
    album: AlbumDocument

    /** The title of the image. */
    @Column()
    title: string

    /** The URL associated with the image. */
    @Column()
    url: string
}
