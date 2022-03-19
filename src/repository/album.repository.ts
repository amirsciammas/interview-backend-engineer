import {AppDataSource} from '../database/data-source';
import {AlbumDocument} from '../entity/AlbumDocument';
import {CompleteUserAlbumPageRequest} from '../api/CompleteUserAlbumPageRequest';

export const AlbumRepository = AppDataSource.getRepository(AlbumDocument).extend({
  /**
   * Finds a page containing of a complete view of a user albums matching the provided criteria.
   *
   * @param request The request containing the criteria by which to filter the albums.
   * @return An array of albums matching the given criteria, upon success.
   */
  findCompleteAlbums(request: CompleteUserAlbumPageRequest): Promise<AlbumDocument[]> {
    const userId = request.getId;
    let queryBuilder =
        this.createQueryBuilder('album')
          .leftJoinAndSelect('album.user', 'user')
          .leftJoinAndSelect('album.images', 'image')
          .where('album.userId = :requestedUserId', { requestedUserId: userId })
          .take(request.getElementNumber)
          .skip((request.getPageNumber - 1) * request.getElementNumber);
    if (request.getAlbumTitleSortingCriteria != null) {
      queryBuilder.orderBy('album.title', request.getAlbumTitleSortingCriteria);
    }
    return queryBuilder.getMany();
  }
})
