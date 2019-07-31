# NC-NEWS

This Test-driven development (TDD) project was to build an API that connects to PostgreSQL using Knex, serving up numerous endpoints that would either return objects containing a specific item or an object containing an array of objects. Some of these endpoints would simply be means of getting data, where as others enabled you to post, update or even delete specific data.

The API end points JSON can be found at [https://sam-nc-news.herokuapp.com/api]
The site based from the endpoints can be found at [https://nc-news-sam.netlify.com/]

## Getting started

### Dependencies

- Express 4.17.1: [https://expressjs.com/]
- Knex 0.17.6: [https://www.npmjs.com/package/knex]
- PostgreSQL 7.11.0: [https://www.npmjs.com/package/pg]

These packages are installed using the following command:

```bash
npm install express knex pg
```

### Development Dependencies

- Mocha 6.1.4: [https://www.npmjs.com/package/mocha],
- Chai: 4.2.0 [https://www.npmjs.com/package/chai],
- Supertest 4.0.2: [https://www.npmjs.com/package/supertest]

Since Mocha, Chai and Supertest are all installed as development dependencies, you use the following command:

```bash
npm install -d mocha chai supertest nodemon
```

### Avaliable scripts

```js
npm start

// Listens for changes on the browser
```

```js
npm run setup-dbs

// Creates the development and test databases locally.
```

```js
npm run seed

// Seeds the development and test bases with data
```

```js
npm run migrate-make FILE_NAME
// Uses Knex migration tool to create migration files filled with boilerplate code
```

```js
npm run migrate-latest
// Updates the datebase with the migrations
```

```js
npm run migrate-rollback
//  Rolls back the most recent migrations
```

```js
npm run seed:prod
// Sets the Node enviroment to production, gets heroku database URL and then seeds the database
```

```js
npm run migrate-latest:prod
// Sets the Node enviroment to production, gets heroku database URL and updates the database to the latest migration
```

```js
npm run migrate-rollback:prod
// Sets the Node enviroment to production, gets heroku database URL and rollbacks the most recent migration to the database
```

## Testing

Within the spec folder there are two spec files:

- app.spec.js
- utils.spec.js

### app.spec.js

Within the spec file the node enviroment and using the following command the file is run using, mocha, chai, chai-sorted and supertests on any assertions I have made:

```js
npm test
```

This file tests serves two purposes on app.js:

##### Avaliable end points

There are numerous end points avaliable that allow a user to either GET, POST, PATCH or DELETE data on the server.

The tests are to assert what a user would receive from an endpoint when using a particular method and to ensure that there is conistency in what they would receive across all endpoints

##### Error handling

There are numerous ways an endpoint could fail, either by trying to GET data that doesn't exist or to PATCH data in an incorrect way. These test are varied to ensure errors are handled appropriately and a response is given to the user so they know why and also that there aren't any false positives. For example when trying to GET comments for an article that exists and trying to get comments for an article that doesn't exist would both present the user with an empty array. It is more appropriate in the latter case to provide an error message telling them that article doesn't exist.

### utils.spec.js

This file tests db/utils/util.js. This file is where the essential utilities needed in order to successfully migrate the source data into the database.

```js
npm run test-utils
```

Using mocha and chai, these tests check wheter the created functions output the inputted data correctly in order for it to be inserted into the database either with the creation of a referece object or by formatting the data. Without these tests data could be enter malformed which would result in wrong data being served by the end points.

## Deployment

Using the following guide [https://github.com/northcoders/be-nc-news/blob/master/hosting.md] this app was deployed to Heroku here :[https://sam-nc-news.herokuapp.com/api]

## Author

- **Sam Moran** - [Github: angriestofhippos](https://github.com/angriestofhippos)
