const Albums = require('../models/Albums');
const Images = require('../models/Images');
const User = require('../models/User');

const dto = require('../dto/UserDto');

exports.getUser = async (id) => {
    return await User.findByPk(id);
};

exports.getUserAblums = async (id) => {
    const data = await Albums.findAll({where : { userId : id } , include: [User]});
    return dto.UserAlbumDto(data);
};

exports.getUserAlbumsAndImages = async (id , limit = Number.MAX_SAFE_INTEGER , offset = 0 , sortByAlbumTitle) => {
    let sortBy = ['id'];
    if(sortByAlbumTitle !== undefined && ['ASC' , 'DESC'].indexOf(sortByAlbumTitle) !== -1) {
        sortBy = ['title' , sortByAlbumTitle]
    }
    const data =  await Albums.findAll({where : {
        userId : id
    } , 
    include : [Images] , 
    order: [sortBy] ,
    limit :limit , 
    offset : offset });

    return data;
};
