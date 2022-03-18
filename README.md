# Backend Engineer Interview Project

[![GitHub stars](https://img.shields.io/github/stars/fatihyildizli/nodejs-case.svg)](https://github.com/fatihyildizli/interview-backend-engineer/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/fatihyildizli/nodejs-case.svg)](https://github.com/fatihyildizli/interview-backend-engineer/network/members)
![License](https://img.shields.io/github/license/fatihyildizli/interview-backend-engineer)
![Code size](https://img.shields.io/github/repo-size/fatihyildizli/interview-backend-engineer)
![Top Language](https://img.shields.io/github/languages/top/fatihyildizli/interview-backend-engineer)
![Languages](https://img.shields.io/github/languages/count/fatihyildizli/interview-backend-engineer)

<img src="assets/adidas-logo-branco.png" width="48">

## Requirements
The `database.sqli` file is a database that includes 3 tables:
- *users* - each row represnts a single user
- *albums* - albums of a user
- *images* - images of an album

The `entities_sample.txt` file includes the structure of the tables and sample data of each table.

The API should have the following endpoints:
- Get User by user Id
- Get User and Albums by user Id
- Get Albums and Images by user Id
    - Endpoint should include support for pagination
    - Endpoint should include support for sorting by album title

-----

## TechStacks

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sqlite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white) ![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white) 


## Swagger Documentation 

http://localhost:1949/wiki

## Installation
1. Clone the repo 
   ```
    git clone https://github.com/fatihyildizli/interview-backend-engineer.git
   ```
2. Install NPM packages
   ```
    npm install
   ```
   
## Setup Guide
Run the command to start the app with node
   ```
  $ npm run start
   ```

Run the command for unit and integration tests
   ```
  $ npm run test
   ```

Run the command for unit test with coverage 
 ```
$ npm test -- --coverage
 ```
## Endpoints

`GET https://localhost:1949/api/users/{id}` -  Get User by user Id

`GET https://localhost:1949/api/users/{id}/albums` - Get User and Albums by user Id

`GET https://localhost:1949/api/users/{id}/albums/images?offset={offset}&limit={limit}&sortByAlbumTitle={sortByAlbumTitle}` - Get Albums and Images by user Id with pagination & order by albumId

**Response Payload**

Generic Response payload has 3 main fields.
 -  ```code``` is for status of the request.
 -  ```msg```  is for state of request "Success" or "Failure"
 - ```results``` results 

```
{
    "code": 200,
    "msg": "Success",
    "records": [
        {
            ...
        }
    ]
}
```

## Dependencies
```
       "dependencies": {
        "better-sqlite3": "^7.5.0",
        "body-parser": "^1.19.2",
        "cors": "^2.8.5",
        "dotenv": "^16.0.0",
        "express": "^4.17.3",
        "express-validator": "^6.14.0",
        "helmet": "^5.0.2",
        "joi": "^17.6.0",
        "morgan": "^1.10.0",
        "sequelize": "^6.17.0",
        "sqlite3": "^5.0.2",
        "swagger-jsdoc": "^6.1.0",
        "swagger-ui-express": "^4.3.0",
        "winston": "^3.6.0"
      },
      "devDependencies": {
        "babel-cli": "^6.26.0",
        "babel-preset-env": "^1.7.0",
        "jest": "^27.5.1",
        "nodemon": "^2.0.15",
        "superagent": "^7.1.1",
        "supertest": "^6.2.2"
      }
```