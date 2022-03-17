# Backend Engineer Interview Project
## Overview
Super cool Artist API to manage Artist and their Albums with Images.
### REST Endpoints
1. GET `/user/{userId}` => Returns data of that user.
2. GET `/user/{userId}/albums` => Returns user with albums, supports pagination with sort by album-title. `?page={Number}&size={Number}&sortByTitle={asc/desc}`
3. GET `/user/{userId}/albums/images` => Returns Users albums with images, supports pagination with sort by album-title. `?page={Number}&size={Number}&sortByTitle={asc/desc}`
----
### Local Running
1. Clone the Repo
2. Install node packages
    ```
     yarn install / npm install
    ```
3. Run Application
    ```
    yarn start / npm start
    ```
4. [Click](http://localhost:3000/) => Might able to see **I'm Good!**

5. If above all goes well, everything should be running now.
## [Swagger-Ui](http://localhost:3000/api/doc/) 
----
## Tech Stack
- TypeScript
- NestJs with Express