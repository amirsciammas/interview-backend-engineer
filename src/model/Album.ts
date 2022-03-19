import {Image} from './Image';
import {User} from './User';
import {AlbumDocument} from '../entity/AlbumDocument';

/** The definition of an album. */
export class Album {
    constructor(title: string, user: User, images: Image[]) {
        this.title = title;
        this.user = user;
        this.images = images;
    }

    /** The title of the album. */
    private title: string;

    /** The user to whom the album belongs. */
    private user: User;

    /** The images associated with the album. */
    private images: Image[];

    set setUser(value: User) {
        this.user = value;
    }

    get getUser(): User {
        return this.user;
    }

    public static from(albumDocument: AlbumDocument): Album {
        let album: Album =
            new Album(
                albumDocument?.title,
                User.from(albumDocument?.user),
                albumDocument?.images?.map(imageDocument => Image.from(imageDocument)));
        if (album.getUser == null
            || Object.keys(album.getUser).length === 0
            ||  Object.values(album.getUser).every(u => u === undefined)) {
            album.setUser = undefined;
        }
        return album;
    }
}
