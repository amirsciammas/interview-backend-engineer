import 'mocha'
import * as td from 'testdouble'
import { context, expectMiddlewareFunctionThrow } from '../test/mock-utility'
import { expect } from 'chai'

describe('Routes for users', () => {
    /** The module under test (SUT) */
    let sut
    /** the require done by the SUT that wil be mock */
    let mock

    beforeEach(() => {
        mock = td.replace('../controllers/databaseRequest')
        sut = require('./users')
    })

    afterEach(() => {
        td.reset()
    })

    describe('GET', () => {
        it('returns valid json user with their data ', async () => {
            // act
            const actual = [{
                'id': 1,
                'name': 'Luca Saccone',
                'email': 'lu.saccone@gmail.com',
                'address_geo_lat': -37.3159,
                'address_geo_lng': 81.1496
            }]
            const expected = '{"user":[{"id":1,"name":"Luca Saccone","email":"lu.saccone@gmail.com","address_geo_lat":-37.3159,"address_geo_lng":81.1496}]}'
            td.when(mock.getUserById(actual.id)).thenResolve(actual)

            // arrange
            await sut.usersGet(context)

            // assert
            const devices = context.body
            expect(devices).to.deep.equal(expected)
        })

        it('should throw when the id is not a number', async () => {
            // act
            // arrange
            td.when(mock.getUserById(td.matchers.argThat((ctx) => {
                return (ctx.params.id = '8')
            })))
                .thenDo((ctx) => {
                    ctx.throw(400, 'Must be a number')
                })

            // assert
            await expectMiddlewareFunctionThrow(sut.usersGet, 400, 'Must be a number')
        })

        it('returns valid json user and albums with their data', async () => {
            // act
            const actual = [{
                'userId': 1,
                'id': 1,
                'title': 'quidem molestiae enim',
                'name': 'Luca Saccone',
                'email': 'lu.saccone@gmail.com',
                'address_geo_lat': -37.3159,
                'address_geo_lng': 81.1496
            }]
            const expected = '{"user":[{"userId":1,"id":1,"title":"quidem molestiae enim","name":"Luca Saccone","email":"lu.saccone@gmail.com","address_geo_lat":-37.3159,"address_geo_lng":81.1496}]}'
            td.when(mock.getUserAlbumByUserId(actual.id)).thenResolve(actual)

            // arrange
            await sut.userAlbumGet(context)

            // assert
            const devices = context.body
            expect(devices).to.deep.equal(expected)
        })

        it('should throw when the id is not a number', async () => {
            // act
            // arrange
            td.when(mock.getUserAlbumByUserId(td.matchers.argThat((ctx) => {
                return (ctx.params.id = '8')
            })))
                .thenDo((ctx) => {
                    ctx.throw(400, 'Must be a number')
                })

            // assert
            await expectMiddlewareFunctionThrow(sut.userAlbumGet, 400, 'Must be a number')
        })

    })

})
