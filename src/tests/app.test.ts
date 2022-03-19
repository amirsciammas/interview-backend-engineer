import request from 'supertest';
import {app} from '../app';
import {User} from '../model/User';
import * as AlbumService from '../service/album.service';
import * as UserService from '../service/user.service';
import {Album} from '../model/Album';
import {Image} from '../model/Image';
import {CompleteUserAlbumPageResult} from '../model/CompleteUserAlbumPageResult';
import {CompleteUserAlbumPageRequest, Sort} from '../api/CompleteUserAlbumPageRequest';
import Criteria = Sort.Criteria;

describe('Users', () => {
    describe('Find user with ID 1', () => {
        const user: User = new User(
            'name',
            'email',
            1.0,
            2.0,
            []);

        const spy = jest.spyOn(UserService, 'findById').mockResolvedValueOnce(user);

        it('GET /users/1', (done) => {
            request(app)
                .get('/users/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual({data: user});
                    expect(spy).toHaveBeenCalledWith(1);
                })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe('Find user with invalid IDs', () => {
        const errorPayload: any = {message: 'A valid ID must be provided'};
        it('GET /users/a', (done) => {
            request(app)
                .get('/users/a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .expect((res) => expect(res.body).toEqual(errorPayload))
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
        it('GET /users/1a', (done) => {
            request(app)
                .get('/users/1a')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .expect((res) => expect(res.body).toEqual(errorPayload))
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });

    describe('Find user albums associated with valid user ID', () => {
        const user: User = new User(
            'name',
            'email',
            1.0,
            2.0,
            [
                new Album('title', undefined, [])
            ]);

        const spy = jest.spyOn(UserService, 'findAlbumsByUserId').mockResolvedValueOnce(user);

        it('GET /users/1/albums', (done) => {
            request(app)
                .get('/users/1/albums')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual({data: user});
                    expect(spy).toHaveBeenCalledWith(1);
                })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    })

    describe('Find user albums with invalid user ID', () => {
        const errorPayload: any = {message: 'A valid ID must be provided'};
        it('GET /users/a/albums', (done) => {
            request(app)
                .get('/users/a/albums')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .expect((res) => expect(res.body).toEqual(errorPayload))
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
        it('GET /users/1a/albums', (done) => {
            request(app)
                .get('/users/1a/albums')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400)
                .expect((res) => expect(res.body).toEqual(errorPayload))
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });
});

describe('Albums', () => {
    describe('Find paginated users with ID 1', () => {
        const completeUserAlbumPageRequest: CompleteUserAlbumPageRequest =
            new CompleteUserAlbumPageRequest(1, 1, 5, Criteria.ASC);
        const user: User = new User(
            'name',
            'email',
            1.0,
            2.0,
            []);
        const completeUserAlbumPageResult =
            new CompleteUserAlbumPageResult(
                user,
                [
                    new Album('title', undefined, [
                        new Image('imageTitle1', 'url1', undefined)
                    ]),
                    new Album('title2', undefined, [
                        new Image('imageTitle2', 'url2', undefined)
                    ]),
                    new Album('title3', undefined, [
                        new Image('imageTitle3', 'url3', undefined)
                    ]),
                    new Album('title4', undefined, [
                        new Image('imageTitle4', 'url4', undefined)
                    ]),
                    new Album('title5', undefined, [
                        new Image('imageTitle5', 'url5', undefined)
                    ]),
                ],
                1,
                5);

        it('POST /users/albums', (done) => {
            const spy =
                jest
                    .spyOn(AlbumService, 'findCompleteAlbums')
                    .mockResolvedValueOnce(completeUserAlbumPageResult);
            request(app)
                .post('/users/albums')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(completeUserAlbumPageRequest)
                .expect('Content-Type', /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual({data: completeUserAlbumPageResult});
                    expect(spy).toHaveBeenCalledWith(completeUserAlbumPageRequest);
                })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });
});