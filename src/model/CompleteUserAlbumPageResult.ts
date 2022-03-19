import {User} from './User';
import {Album} from './Album';

/** The request used to retrieve a detailed page of a user's album collection. */
export class CompleteUserAlbumPageResult {
    constructor(user: User, albums: Album[], page_number: number, element_number: number) {
        this.user = user;
        this.albums = albums;
        this.page_number = page_number;
        this.element_number = element_number;
    }

    /** The user of interest. */
    private user: User;

    /** The albums of the user. */
    private albums: Album[];

    /** The requested page number. */
    private readonly page_number: number;

    /** The requested number of elements. */
    private readonly element_number: number;
}