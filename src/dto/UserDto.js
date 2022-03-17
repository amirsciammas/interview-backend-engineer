exports.UserAlbumDto = (userAlbums) => {
    const albums = userAlbums.map(album => {
        return {
            id : album.id,
            title : album.title
            
        };
    });
    const {id , name , email } = (!isEmpty(userAlbums)) ? userAlbums[0].user : {};
    return {
        id : id ,
        name : name , 
        email : email , 
        albums : albums
    }
};


isEmpty = (obj) =>{
    return !obj || Object.keys(obj).length === 0;
}