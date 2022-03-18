exports.UserAlbumDto = (userAlbums) => {
  const albums = userAlbums.map((album) => {
    return {
      id: album.id,
      title: album.title,
    };
  });
  const { id, name, email } =
    Object.keys(userAlbums).length !== 0 ? userAlbums[0].user : {};
  return {
    id: id,
    name: name,
    email: email,
    albums: albums,
  };
};
