export interface User {
  id: number;
  name: string;
  email: string;
  address_geo_lat: number;
  address_geo_lng: number;
}

export interface Image {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface UserWithAlbum extends User {
  albums?: Album[];
}

export interface AlbumWithImages extends Album {
  images?: Image[];
}

export enum SortOption {
  ASC = 'asc',
  DESC = 'desc',
}
