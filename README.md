# Backend Engineer Interview Project

# Rest API 
This is a back-end REST API code that leverages the capability to Get User Details along with his associated interests in Albums and their Images.This is a REST API back-end built with Typescript,NodeJS,Sqlite and Jest.
- Application endpoint : localhost:3000


### SETUP INSTRUCTIONS

- Node.js and npm (Latest version) must be installed on your machine.
- Run npm init
- Run tsc-init to initialize ts-config.
- Run npm install to install all dependencies defined in package.json.
- configure tsconfig.json file:
  - "outDir": "./dist", ( Redirect output structure as per your requirement. )
  - "rootDir": "./src", ( Root directory)
- database.db file is included along with code.

## Run the app
```
npm run dev
```

## Run the tests

```
npm run test
```

# REST API

These endpoints allow for various operations that can be performed to Collect User Details.

## Create a new User 

### Request: `GET /users/:userId`

### Response

```json
{
    "id": 3,
    "name": "Rohit",
    "email": "rs@adi.biz",
    "address_geo_lat": 17.9991,
    "address_geo_lng": 43.4332
}
```

## To Get User and Album Details for a Particular UserId

### Request: `GET /users/:userId/albums?sort=title&order=asc&limit=5`

<br>

**Note:**

>- You can sort the results (Default title).
>- Order the result by passing asc or desc flag. 
>- Limit the output.(Default Limit is 10)** 

<br>

### Response

```json
[
    {
        "id": 41,
        "userId": 4,
        "title": "Streets -Do Ja Cat",
        "name": "KL Rahul"
    },
    {
        "id": 42,
        "userId": 4,
        "title": "Whoopty -CJ",
        "name": "KL Rahul"
    }
]
```

## To Get Album and Image Details for a given UserId

### Request: `GET /users/:userId/albums/images?sort=title&order=asc&limit=5`

<br>

**Note:**

>- You can sort the results (Default title).
>- Order the result by passing asc or desc flag. 
>- Limit the output.(Default Limit is 10)** 

<br>


### Response

```json
[
    {
        "albumId": 41,
        "id": 4001,
        "title": "Streets",
        "url": "http://www.sample.edu/?canvas=earth&relation=cap",
        "userId": 4
    },
    {
        "albumId": 42,
        "id": 4002,
        "title": "Whoopty",
        "url": "http://www.sample.edu/?canvas=earth&relation=cap",
        "userId": 4
    }
]
```
