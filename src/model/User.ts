import {Album} from './Album';
import {UserDocument} from '../entity/UserDocument';

/** The definition of a user. */
export class User {
    constructor(name: string, email: string, address_geo_lat: number, address_geo_lng: number, albums: Album[]) {
        this.name = name;
        this.email = email;
        this.address_geo_lat = address_geo_lat;
        this.address_geo_lng = address_geo_lng;
        this.albums = albums;
    }

    /** The name of the user. */
    private name: string;

    /** The email of the user. */
    private email: string;

    /** The latitude position associated with the user current address. */
    private address_geo_lat: number;

    /** The longitude position associated with the user current address. */
    private address_geo_lng: number;

    /** The albums owned by the user. */
    private albums: Album[];

    public static from(userDocument: UserDocument): User {
        return new User(
            userDocument?.name,
            userDocument?.email,
            userDocument?.address_geo_lat,
            userDocument?.address_geo_lng,
            userDocument?.albums?.map(albumDocument => Album.from(albumDocument)));
    }
}