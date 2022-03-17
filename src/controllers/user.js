const { check , validationResult } = require('express-validator');
const userService = require('../service/user');

exports.getUser = async (req , resp) => {
    try {
        const id = req.params.id;
        const results = await userService.getUser(id);
        resp.send(results);
    } catch (err) {
        console.error(err);
        resp.status(500).send({ error: 'Failed to get user' });
    }
};

exports.getUserAblums = async (req , resp) => {
    try {
        const id = req.params.id;
        const results = await userService.getUserAblums(id);
        resp.send(results);
    } catch (err) {
        console.error(err);
        resp.status(500).send({ error: 'Failed to get user albums' });
    }
};

exports.getUserAblumsAndImages = async (req , resp) => {
    try {
        const { limit , offset , sortByAlbumTitle } = req.query;
        const id  = req.params.id;
        const results = await userService.getUserAlbumsAndImages(id , limit , offset , sortByAlbumTitle);
        resp.send(results);
    } catch (err) {
        console.error(err);
        resp.status(500).send({ error: 'Failed to get user albums' });
    }
};