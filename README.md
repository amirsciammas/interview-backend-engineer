# CRUD Rest API Nodejs with Typescript

Sample Nodejs API with Typescript and Mongodb

## Script:

- npm install
- npm start

## Nodejs Typescript project

Follow these steps to create a new nodejs project with Typescript

- npm init
- tsc --init
- configure tsconfig.json file:
  - "outDir": "./build", ( Redirect output structure to the directory. )
  - "rootDir": "./src", ( Specify the root directory of input files. Use to control the output directory structure with outDir.)


## Endponts:
[HOST] : localhost:5000

### User:

Get User by user Id
- Method: GET
         [HOST]/user/userId
Get User and Albums by user Id
  -Method: GET
          [HOST]/users/:userId/albums?sort=title&order=desc
          Pagination : 
          [HOST]/users/:userId/albums?limit=10&offset=5

-Method: GET
          [HOST]/users/:userId/albums/images?sort=title&order=desc
          Pagination : 
          [HOST]/users/:userId/albums/images?limit=10&offset=5




