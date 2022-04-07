# Test descriptions

## Tesing endpoint `/api/npsdata``

1. when passed npsData to the endpoint /api/npsdata
   passing request body as

```js
const bodyData = {
  employeeid: Math.floor(Math.random() * 500),
  date: "2018-06-04",
  score: 9,
  feedback: "Best organization ",
};
```

Returns the response statusCode as 200
