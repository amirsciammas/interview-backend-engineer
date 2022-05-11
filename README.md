# Release Notes
## 1.0.0 May 08, 2022
## New Features
* api's to  
  - Get User by user Id
  - Get User and Albums by user Id
  - Get Albums and Images by user Id : supports pagination and sorting

## Bugfixes
* none


How to test
1.Start with npm start
2.Go to swagger/postman

1.To get user by id  : localhost:3000/api/users/1
2.To get user albums: localhost:3000/api/users/1/albums
3.To get user albums and images with page and sorting by title: localhost:3000/api/users/1/albums-and-images?page=1 



### Future Enhancement 
1. Add more unit test and integration tests with better response validations etc
2. Secure endpoints using authentication/authorization
3. Use logging library like expressWinston and make a loggin service, we can also use correlation id mechanism so each request/response has trace
4. Make generic exception handler
5. Refactor code in database.js . I am new to sqlite , to make it work took sometime and code in database.js is not refactored at all.
6. Cover OWASP security princples checking input validations etc
7. The ideal restful response should look like this , It should contain redirection to albums and images. So , I would have proceeded by making controllers
   for these domain objects as well.
{
   "id": 1,
   "name": "Bilbo Baggins",
   "": "burglar",
   "_links": {
  
   "albums": {
   "href": "http://localhost:8080/albums"
   }
   }
   }
8. I am pushing code at one go. However commits will look something like this:
  - Initial commit with read me
  - Adding test to get users
  - Adding node server configurations
  - Adding database confirgurations
  - Adding repository , service and controllers
