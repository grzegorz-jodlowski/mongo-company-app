<p align="center">
<a href="https://github.com/grzegorz-jodlowski/mongo-company-app"><img src="./mongoose.jpg" title="company-app" alt="snippet of company app source code"></a>
</p>



# <p align="center">🏤 Company app</p>
<p align="center">Project for learning MongoDB</p>

</br>

## Table of Contents

- [What's this project about?](#about)
- [Technologies used](#tech)
- [What I learned?](#what)
- [Interesting code snippet](#what)
- [Installation and quick start](#install)
- [NPM scripts](#npmscripts)

</br>

## <a name="about"></a>What's this project about?

This is the backend part of the application for managing employees and products in the company. It is based on the MongoDB database and uses the Moongose library to data validation and simplify communication with the database.

</br>

## <a name="tech"></a>Technologies used
- JavaScript
- Express
- MongoDB
- Mongoose
- Mocha/Chai
- GIT

</br>

## <a name="what"></a>What I learned?

- differences in relational and nonrelational databases,
- use raw commands to create, read, update and delete data from MongoDB (CRUD),
- use MongoDB Compass to view and manually edit the database,
- connect the database to our server,
- work with Coursor - data format returned by MongoDB,
- use the database in other files,
- use the Mongoose library to:
  - simplify contact with the MongoDB,
  - validate data,
  - model the data according to the schema,
  - join data from many collections into one larger object (references using the `populate` method),
- available data types supported by Mongoose,
- perform CRUD methods using Mongoose commands,
- import a large amount of initial data into the database,
- set up a remote database on the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website,
- test code on the backend using Mocha/Chai libraries.


</br>

## <a name="interesting"></a>Interesting code snippet (for me of course 😉)
- Setup mongoose:

```js
const mongoose = require('mongoose');

...
...

mongoose.connect('mongodb://localhost:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;
```

- Simple mongoose model:

```js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true, ref: 'Department' },
});

module.exports = mongoose.model('Employee', employeeSchema);
```

- Simple Mocha/Chai test:

```js
const expect = require('chai').expect;

const Product = require('../product.model');

describe('Product', () => {
  const args = ['name', 'client'];

  it('should throw an error if args are not a strings', () => {
    const cases = [{}, []];

    for (let element of cases) {
      const product = new Product({ name: element, client: element });
      product.validate(err => {
        args.forEach(arg => {
          expect(err.errors[arg]).to.exist;
        })
      });
    }
  });

  it('should not throw an error if args have proper format', () => {
    const product = new Product({ name: 'Lorem', client: 'Ipsum' });

    product.validate(err => {
      expect(err).to.not.exist;
    });
  });
});
```

</br>

## <a name="install"></a>Installation and quick start

- use the package manager [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/) to install dependencies:

```bash
npm install // yarn install

or

npm i // yarn
```
- run server with nodemon (after nodemon installation):

```bash
npm start

or

yarn start
```

## <a name="npmscripts"></a>NPM scripts

There are 3 main scripts to speed up work:

- `start`: run server with nodemon,
- `test`: run tests once,
- `test:watch`: start watch mode for tests,

</br>
</br>

  *project implemented as part of the 9-month [Web Developer Plus](https://kodilla.com/pl/bootcamp/webdeveloper/?type=wdp&editionId=309) course organized by [Kodilla](https://drive.google.com/file/d/1AZGDMtjhsHbrtXhRSIlRKKc3RCxQk6YY/view?usp=sharing)


