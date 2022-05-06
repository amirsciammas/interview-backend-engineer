
import * as databaseRequest from '../controllers/databaseRequest'
var Router = require('koa-router')

// TODO swagger doc
/**
 * Getting user by it's id
 * @function devicesGet
 * @async
 * @param {Koa.Context} ctx - Koa context; Encapsulate request and response.
 */
export const usersGet = async (ctx) => {
    const id = ctx.params.id
    if (isNaN(id)) {
        ctx.throw(400, 'Must be a number')
    }
    const user = await databaseRequest.getUsers(id)
    if (user == "") {
        ctx.throw(400, 'id not found')
    }

    const users = { user: user }
    ctx.body = JSON.stringify(users)
}

const router = new Router()

/**
 * @swagger
 * /users/:id
 *   get:
 *    summary: Get user by id
 *    description: List of the user
 *    tags: [Users]
 *    operationId: get_user_by_id
 *    responses:
 *        '200':
 *           description: Successfully getting user that exists in the database
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Users'
 * */
router.get('get-user', '/:id', usersGet)

export const routes = router.routes()