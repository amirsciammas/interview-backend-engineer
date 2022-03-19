import {AppDataSource} from '../database/data-source';
import {UserDocument} from '../entity/UserDocument';

export const UserRepository = AppDataSource.getRepository(UserDocument).extend({
  /**
   * Finds the user associated with the provided user ID.
   *
   * @param id The ID of the user of interest.
   * @return The document associated with the user, containing a summarized view, if found.
   */
  findById(id: number): Promise<UserDocument> {
    return this.createQueryBuilder('user')
        .where('user.id = :id', { id })
        .getOne();
  },

  /**
   * Finds the user associated with the provided user ID, populated with the user's current album collection.
   *
   * @param id The ID of the user of interest.
   * @return The document associated with the user, containing the user albums, if found.
   */
  findAlbumsByUserId(id: number): Promise<UserDocument> {
    return this.createQueryBuilder('user')
        .leftJoinAndSelect('user.albums', 'album')
        .where('album.userId = :id', {id})
        .getOne();
  }

})
