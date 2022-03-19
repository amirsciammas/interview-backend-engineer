import {UserRepository} from '../repository/user.repository';
import {User} from '../model/User';

/**
 * Finds the user associated with the provided user ID.
 *
 * @param id The ID of the user of interest.
 * @return The document associated with the user, containing a summarized view, if found.
 */
export const findById = async (id: number): Promise<User> => {
  return UserRepository.findById(id)
      .then(userDocument => User.from(userDocument));
};

/**
 * Finds the user associated with the provided user ID, populated with the user's current album collection.
 *
 * @param id The ID of the user of interest.
 * @return The document associated with the user, containing the user albums, if found.
 */
export const findAlbumsByUserId = async (id: number): Promise<User> => {
  return UserRepository.findAlbumsByUserId(id)
      .then(userDocument => User.from(userDocument));
};
