import {Album} from './Album';
import {ImageDocument} from '../entity/ImageDocument';

/** The definition of an image. */
export class Image {
    constructor(title: string, url: string, album: Album) {
        this.title = title;
        this.url = url;
        this.album = album;
    }

    /** The title of the image. */
    private title: string;

    /** The URL associated with the image. */
    private url: string;

    /** The album to which the image belongs. */
    private album: Album;

    public static from(imageDocument: ImageDocument): Image {
        let image: Image =
            new Image(
                imageDocument?.title,
                imageDocument?.url,
                Album.from(imageDocument?.album));
        if (image.album == null
            || Object.keys(image.album).length === 0
            || Object.values(image.album).every(u => u === undefined)) {
            delete image.album;
        }
        return image;
    }
}
