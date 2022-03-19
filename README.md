# Backend Engineer Interview Project

### **High level spec**

Your task is to build a REST API in Node.js that returns data from sqlite database.

The `database.sqli` file is a database that includes 3 tables:
- *users* - each row represents a single user
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

### **How to share your results?**
- [ ] Clone this repository and create your own branch to work on.
- [ ] .... develop .....
- [ ] Once you are ready, create a pull request with your code.


### **Evaluation:**
- [ ] There should be **at least** one test written and the README file should include instructions on how to execute it.
- [ ] You should provide clear documentation of the API, you can use Swagger or any other format.
- [ ] The app should build without errors (typically using `npm run build`). If there are necessary steps required to get it to compile, those should be covered in the README.md.
- [ ] No crashes or bugs.
- [ ] Code is easily understood and communicative (eg. comments, variable names, etc). 
- [ ] Everything that you decide to not do due to the limitation of time should be documented in the README.
- [ ] GitHub commit history is consistent, easy to follow and understand. 

### **Follow-up points:**
- To run the application: `docker-compose up --build -d application` to run the container, 
`docker-compose logs -f application` to display the logs and `docker-compose down` to stop and remove the container. 
Alternatively, `yarn install; yarn start` also works, but the commands cannot be run at the same time as they would share the same port.
- Once started, Swagger can be accessed via `http://localhost:2500/swagger`.
- The database used was the provided one. As such, data is already inserted and endpoints can
be triggered without any required migrations.
- In order to trigger the requested endpoints, the usage of e.g. curl suits perfectly:
```
> curl -X GET localhost:2500/users/1
> {"data":{"name":"Leanne Graham","email":"Sincere@april.biz","address_geo_lat":-37.3159,"address_geo_lng":81.1496}}
```
```
> curl -X GET localhost:2500/users/1/albums
> {"data":{"name":"Leanne Graham","email":"Sincere@april.biz","address_geo_lat":-37.3159,"address_geo_lng":81.1496,"albums":[{"title":"quidem molestiae enim"}, ...]}}
```
```
> curl -X POST localhost:2500/users/albums -d '{"id": 1, "album_title_sorting_criteria": "ASC" }' 
-H 'Content-Type: application/json'
> {"data":{"user":{"name":"Leanne Graham","email":"Sincere@april.biz","address_geo_lat":-37.3159,"address_geo_lng":81.1496},"albums":[{"title":"distinctio laborum qui","images":[{"title":"dolorem accusantium corrupti incidunt quas ex est","url":"https://via.placeholder.com/600/5e912a"}, ...], ...]}}
```
- Due to time constraints, only integration tests related to endpoints were implemented. In order to run them, please run `yarn install; yarn test`.
- Due to time constraints, I also didn't find the opportunity to fix Swagger to successfully trigger endpoints.
- It was assumed the pagination was requested from an album perspective and not an image perspective.
