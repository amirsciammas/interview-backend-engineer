# Backend Engineer Interview Project

This is a REST API that provides access to data from an SQLite database using Node.js and TypeScript.

## Getting started

To get started with this API, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running npm install or yarn add.
3. Start the API in development mode by running npm run dev.
4. The API should now be running on http://localhost:3000.

### Building the API

To build the API for production, run npm run build. This will compile the TypeScript source code to JavaScript and output it to the dist/ directory.

You can then start the server by running npm start.

### API documentation

The API provides the following endpoints:

`GET /users/:userId`

- Retrieve a single user by ID.

**Parameters:**

userId - the ID of the user to retrieve

**Response**

```json
{
  "id": 1,
  "username": "john.doe",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1 (555) 123-4567"
}
```

`GET /users/:userId/albums?offset=1&limit:2`

- Retrieve a list of albums for a given user, along with their associated images.

**Parameters:**

- `userId` - the ID of the user to retrieve albums for
- `offset (optional)` - the page number of the results to retrieve
- `limit (optional)` - the number of results per page

**Response:**

```json
[
  {
    "userId": 1,
    "id": 5,
    "title": "eaque aut omnis a"
  },
  {
    "userId": 1,
    "id": 6,
    "title": "natus impedit quibusdam illo est"
  }
]
```

`GET /albums/:userId/images?offset=1&limit:2`

- Retrieve a list of albums for a given user, along with their associated images.

Parameters:

- `userId` - the ID of the user to retrieve albums for
- `offset (optional)` - the page number of the results to retrieve
- `limit (optional)` - the number of results per page
- 
**Response:**

```json
[
  {
    "userId": 1,
    "id": 452,
    "title": "mollitia dolorem qui",
    "albumId": 10,
    "url": "https://via.placeholder.com/600/e30072"
  },
  {
    "userId": 1,
    "id": 453,
    "title": "ut alias dolore qui ea culpa recusandae doloribus magnam",
    "albumId": 10,
    "url": "https://via.placeholder.com/600/188c92"
  }
]
```

### Testing 

The API includes unit tests, which can be run by running `npm test`.

```bash 
PASS  src/test/userController.spec.ts (5.561 s)
  User controller
    ✓ should return user by ID (83 ms)
    ✓ should return 404 if user not found (17 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        5.815 s
Ran all test suites.`
```



### **High level spec**

Your task is to build a REST API using TypeScript with Node.js that returns data from sqlite database.

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

### **How to share your results?**
- [ ] Clone this repository to your private account.
- [ ] .... develop .....
- [ ] Once you are ready, create a pull request from your private repo and branch to the original repository.


### **Evaluation:**
- [ ] There should be **at least** one test written and the README file should include instructions on how to execute it.
- [ ] You should provide clear documentation of the API, you can use Swagger or any other format.
- [ ] The app should build without errors (typically using `npm run build`). If there are necessary steps required to get it to compile, those should be covered in the README.md.
- [ ] No crashes or bugs.
- [ ] Code is easily understood and communicative (eg. comments, variable names, etc). 
- [ ] Everything that you decide to not do due to the limitation of time should be documented in the README.
- [ ] GitHub commit history is consistent, easy to follow and understand. 