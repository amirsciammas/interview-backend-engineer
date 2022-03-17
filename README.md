# Backend Engineer Interview Project

### **Overview**

Rest Api App to manage `user and user album` informations

### **How it works ?**

The REST API have the following endpoints:
- `/users/{id}` - to get user information by userId [swagger_doc](http://localhost:3000/api-docs/#/Users/get_users__id_)
- `/user/{id}/albums` - to get user albums by userId [swagger_doc](http://localhost:3000/api-docs/#/Users/get_users__id__albums)
- `/user/{id}/albums/images` - to get user albums and images by userId , with optional parameters [swagger_doc](http://localhost:3000/api-docs/#/Users/get_users__id__albums_images)
    - `sortByAlbumTitle` - to sort the response by album title , and it has two possibilities [`ASC` , `DESC`]
    - `limit` and `offset` for pagination 

-----


<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo

2. Install npm packages
   ```sh
   npm install
   ```
3. In terminal run
   ```sh
   npm start
   ```

### Test
the application includes `Unit Test`, to make sure the functionality is correct before deploy to `staging/prod`
to run test cases execute `npm test` in terminal.

### Swagger-Ui
for more information about the endpoints i've included a swagger-ui (http://localhost:3000/api-docs)

## License
[MIT](https://choosealicense.com/licenses/mit/)
