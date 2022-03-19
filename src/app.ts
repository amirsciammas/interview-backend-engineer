import 'reflect-metadata';
import bodyParser from 'body-parser';
import Cors from 'cors';
import Express from 'express';
import Helmet from 'helmet';
import Morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import * as AlbumService from './service/album.service';
import * as UserService from './service/user.service';
import {CompleteUserAlbumPageRequest} from './api/CompleteUserAlbumPageRequest';

export const app = Express();

app.use(Helmet());
app.use(Cors());
app.use(Morgan('combined'));
app.use(bodyParser.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/users/:id', (req, res) => {
    if (req.params != null && !isNaN(req.params.id)) {
        return UserService.findById(Number(req.params.id))
            .then(users => res.send({data: users}))
            .catch(error => res.status(500).send(error));
    }
    return res.status(400).send({message: 'A valid ID must be provided'});
});

app.get('/users/:id/albums', (req, res) => {
    if (req.params != null && !isNaN(req.params.id)) {
        return UserService.findAlbumsByUserId(Number(req.params.id))
            .then(userAlbums => res.send({data: userAlbums}))
            .catch(error => res.status(500).send(error));
    }
    return res.status(400).send({message: 'A valid ID must be provided'});
});

app.post('/users/albums', (req, res) => {
    const body = req.body;
    const completeUserAlbumRequest: CompleteUserAlbumPageRequest =
        new CompleteUserAlbumPageRequest(
            body?.id, body?.page_number, body?.element_number, body?.album_title_sorting_criteria);
    if (completeUserAlbumRequest == null) {
        return res.status(400).send({message: 'A valid request must be provided'});
    }
    return AlbumService.findCompleteAlbums(completeUserAlbumRequest)
        .then(userAlbums => res.send({data: userAlbums}))
        .catch(error => {
            console.log(error);
            return res.status(500).send(error);
        });
});
