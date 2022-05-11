const database = require("../database/database.js");


const getAllUser = (req, res) => {
    let sql = "select * from users";
    return  database.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "users":rows
        })
    });
}

const getUserById = (userId, res) => {
    let sql = "select * from users as users where id = ?";
    return  database.all(sql, userId, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({user:rows[0]});
    });
}

const getUserAlbumsById = (userId, res) => {

     const sql = `select json_object('id',u.id,'name',u.name,'email',u.email,u.address_geo_lat,u.address_geo_lng,
    'albums' ,(SELECT json_group_array(json_object('title',a.title)) from albums a where a.userId=u.id ) ) as userAlbums from users u  where u.id = ?`;

    let params = userId;
    return  database.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
         res.status(201).send(rows);
    });
}


const getUserAlbumsAndImagesByUserId = (userId, req, res) => {
    const sql = `select distinct json_object('id',u.id,'name',u.name,'email',u.email,u.address_geo_lat,u.address_geo_lng,
    'albums' ,(SELECT json_group_array(json_object('albumId' ,a.id,'title',a.title)) from albums a where a.userId=u.id ) ,'images',
    (SELECT json_group_array(json_object('imageId',id ,'title',i.title)) from images i where i.albumId=a.id )) as userAlbumsImages from users u
    inner join albums a on  a.userid =u.id inner join images i on a.id=i.albumId  where u.id = ? GROUP BY u.id, a.id, i.id ORDER BY a.title LIMIT ?,?`;


    const offset = (req.query.page -1) * 1;
    let params = [userId, offset, 10];
    return  database.all(sql, params,(err, rows) => {
        if (err) {
            console.log(err);
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(201).send(rows);

    });
}

module.exports = {getAllUser, getUserById, getUserAlbumsById,getUserAlbumsAndImagesByUserId};
