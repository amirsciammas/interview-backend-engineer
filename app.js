const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./src/router/user');

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerOptions = require('./src/config/swagger/options');

// swagger configuration 
const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



// log all the incoming request
app.use(morgan('dev'));
// parse body parameter
app.use(bodyParser.json());

// routes
app.use("/users" , userRoutes);

// handle all mismatch requests
app.use((req , resp , next) => {
    const error = new Error('Path Not found');
    error.status = 404;
    next(error);
});

// error handling
app.use((error , req , res , next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});



module.exports = app;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         address_geo_lat: 
 *           type: float
 *         address_geo_lng:
 *           type: float
 *        
 *       example:
 *         id: 1
 *         name: jon
 *         email: jon@test.com
 *         address_geo_lat : 10.20384
 *         address_geo_lng : 103.34895
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *        
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}/albums:
 *   get:
 *     summary: Get user albums by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}/albums/images:
 *   get:
 *     summary: Get user albums and images by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *       - in: query
 *         name: sortByAlbumTitle
 *         schema:
 *           type: String
 *           enum: ['ASC' , 'DESC']
 *           description : sort albums by title
 *         required: false
 *       - in: query
 *         name: limit
 *         schema: 
 *           type: integer
 *         required: false
 *       - in: query
 *         name: offset
 *         schema: 
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
