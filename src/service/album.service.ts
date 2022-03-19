import {AlbumRepository} from '../repository/album.repository';
import {Album} from '../model/Album';
import {CompleteUserAlbumPageRequest} from '../api/CompleteUserAlbumPageRequest';
import {CompleteUserAlbumPageResult} from '../model/CompleteUserAlbumPageResult';

/**
 * Finds a page containing of a complete view of a user albums matching the provided criteria.
 *
 * @param request The request containing the criteria by which to filter the albums.
 * @return An array of albums matching the given criteria, upon success.
 */
export const findCompleteAlbums = async (request: CompleteUserAlbumPageRequest): Promise<CompleteUserAlbumPageResult> => {
    return AlbumRepository.findCompleteAlbums(request)
        .then(albumDocuments => {
            const albums = albumDocuments?.map(doc => Album.from(doc));
            return new CompleteUserAlbumPageResult(
                albums?.find(_ => true).getUser,
                albums?.map(album => {
                    album.setUser = undefined;
                    return album;
                }) || [],
                request.getPageNumber,
                request.getElementNumber
            );});
}
