# Test descriptions

## mariadb.js

### class Database tests

#### **constructor tests**

1. Give correct options to the database

```js
let options = {
  host: "localhost",
  port: 3306,
  user: "Admin",
  password: "secret",
  database: "questionnaire",
  allowPublicKeyRetrieval: true,
};

const db = new Database(options);

console.log(db.options);

Returns:
  {
  host: "localhost",
  port: 3306,
  user: "Admin",
  password: "secret",
  database: "questionnaire",
  allowPublicKeyRetrieval: true
  }
```

2. No options given to the database

```js
const db = new Database();

Throw Error "Options missing!";
```

3. Port in the options not defined

```js
let options = {
  host: "localhost",
  user: "Admin",
  password: "secret",
  database: "questionnaire",
  allowPublicKeyRetrieval: true,
};
const db = new Database(options);

Throw Error "Port missing!";
```

4. Port in the options empty

```js
let options = {
  host: "localhost",
  port: "",
  user: "Admin",
  password: "secret",
  database: "questionnaire",
  allowPublicKeyRetrieval: true,
};
const db = new Database(options);

Throw Error "Port missing!";
```

#### **doQuery tests**

1. With correct sql and parameters

```js
db.doQuery("select * from questionnaire where username = ? and password = ?", [
  "Antti",
  "secret",
]).then((result) => res.json(result.queryResult));

Return {"id": 1, "username": "Antti", "password": "secret"};
```

2. Without correct sql

```js
db.doQuery([
  "Antti",
  "secret",
]).then((result) => res.json(result.queryResult));

Return Promise {}
```
