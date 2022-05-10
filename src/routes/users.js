/**
 * Users routes.
 * @author Luca Saccone
 * @module
 */

/**
 * @swagger
 * tags:
 *    name: Users
 *    description: user management
 */

/**
 * @swagger
 * components:
 *       schemas:
 *          Users:
 *             description: Schema of users
 *             type: object
 *             properties:
 *                id:
 *                   type: number
 *                   description: id of the user
 *                name:
 *                   type: string
 *                   description: name of the user
 *                email:
 *                   type: string
 *                   description: email of the user
 *                address_geo_lat:
 *                   type: number
 *                   description: Geospatial address latitude of the user
 *                address_geo_lng:
 *                   type: number
 *                   description: Geospatial address longitude of the user
 */

/**
 * @swagger
 * components:
 *       schemas:
 *          Albums:
 *             description: Schema of albums
 *             type: object
 *             properties:
 *                userId:
 *                   type: number
 *                   description: id of the user
 *                id:
 *                   type: number
 *                   description: id of the album
 *                title:
 *                   type: string
 *                   description: title of the album
 */

/**
 * @swagger
 * components:
 *       schemas:
 *          Images:
 *             description: Schema of images
 *             type: object
 *             properties:
 *                albumId:
 *                   type: number
 *                   description: id of the album
 *                imagesId:
 *                   type: number
 *                   description: id of the image
 *                imageTitle:
 *                   type: string
 *                   description: title of the album
 */
import * as databaseRequest from '../controllers/databaseRequest'
var Router = require('koa-router')

/**
 * Getting user by it's id
 * @function usersGet
 * @async
 * @param {Koa.Context} ctx - Koa context; Encapsulate request and response.
 */
export const usersGet = async (ctx) => {
    const id = ctx.params.id
    if (isNaN(id)) {
        ctx.throw(400, 'Must be a number')
    }
    const user = await databaseRequest.getUserById(id)
    if (user == "") {
        ctx.throw(404, 'id not found')
    }

    const users = { user: user }
    ctx.body = JSON.stringify(users)
}

/**
 * Getting an user and an album by user id
 * @function userAlbumGet
 * @async
 * @param {Koa.Context} ctx - Koa context; Encapsulate request and response.
 */
export const userAlbumGet = async (ctx) => {
    const id = ctx.params.id
    if (isNaN(id)) {
        ctx.throw(400, 'Must be a number')
    }
    const user = await databaseRequest.getUserAlbumByUserId(id)
    if (user == "") {
        ctx.throw(404, 'id not found')
    }

    const users = { user: user }
    ctx.body = JSON.stringify(users)
}

/**
 * Getting an user and an album by user id
 * @function mediaGet
 * @async
 * @param {Koa.Context} ctx - Koa context; Encapsulate request and response.
 */
export const mediaGet = async (ctx) => {
    const id = ctx.params.id
    const offset = ctx.query.offset
    const order = ctx.query.order
    const limit = ctx.query.limit
    if (isNaN(id)) {
        ctx.throw(400, 'Must be a number')
    }
    const user = await databaseRequest.getMedia(id, order, limit, offset)
    if (user == "") {
        ctx.throw(404, 'id not found')
    }

    const users = { user: user }
    ctx.body = JSON.stringify(users)
}



const router = new Router()

/**
 * @swagger
 * /users/:id:
 *   get:
 *    summary: Get user by id
 *    description: List of the user 
 *    tags: [Users]
 *    operationId: get_user_by_id
 *    parameters:
 *      - in: header
 *        name: id of the user
 *        description: id of the user
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *        '200':
 *           description: Successfully getting user that exists in the database
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Users'
 * */
router.get('get-user', '/:id', usersGet)

/**
 * @swagger
 * /users/:id/album:
 *   get:
 *    summary: Get album with user by user id
 *    description: List of the album and the user 
 *    tags: [Users]
 *    operationId: get_album_by_user_id
 *    parameters:
 *      - in: header
 *        name: id of the user
 *        description: id of the user
 *        required: true
 *        schema:
 *          type: number
 *    responses:
 *        '200':
 *           description: Successfully getting user that exists in the database
 *           content:
 *             application/json:
 *               schema:
 *                  allOf:
 *                      - $ref: "#/components/schemas/Users" 
 *                      - $ref: "#/components/schemas/Albums" 
 * */
router.get('get-user-album', '/:id/album', userAlbumGet)

/**
 * @swagger
 * /users/:id/media:
 *   get:
 *    summary: Get album and images by user id
 *    description: List of the album and the images by user id 
 *    tags: [Users]
 *    operationId: get_media_by_user_id
 *    parameters:
 *      - in: header
 *        name: id of the user
 *        description: id of the user
 *        required: true
 *        schema:
 *          type: number
 *      - in: query
 *        name: order
 *        description: order that you want to have
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        description: limit that you want to have
 *        schema:
 *          type: number
 *      - in: query
 *        name: offset
 *        description: offset that you want to have
 *        schema:
 *          type: number
 *    responses:
 *        '200':
 *           description: Successfully getting user that exists in the database
 *           content:
 *             application/json:
 *               schema:
 *                  allOf:
 *                      - $ref: "#/components/schemas/Users" 
 *                      - $ref: "#/components/schemas/Images" 
 * */
router.get('get-media', '/:id/media', mediaGet)

export const routes = router.routes()