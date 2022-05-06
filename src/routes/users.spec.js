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
            const expected = '{"user":[{"id":1,"name":"Leanne Graham","email":"Sincere@april.biz","address_geo_lat":-37.3159,"address_geo_lng":81.1496}]}'
            td.when(mock.getUsers(actual.id)).thenResolve(actual)

            // arrange
            await sut.usersGet(context)

            // assert
            const devices = context.body
            expect(devices).to.deep.equal(expected)
        })

        it('should throw when the id is not a number', async () => {
            // act
            // arrange
            td.when(mock.getUsers(td.matchers.argThat((ctx) => {
                return (ctx.params.id = '8')
            })))
                .thenDo((ctx) => {
                    ctx.throw(400, 'Must be a number')
                })

            // assert
            await expectMiddlewareFunctionThrow(sut.usersGet, 400, 'Must be a number')
        })

    })

})
