require('dotenv/config');
const express = require('express');
const db = require('db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/activities', (req, res, next) => {
  const sql = `
   select
      "a"."activityId",
      "a"."activityName",
      "add"."addressId",
      "add"."streetAddress",
      "add"."city",
      "add"."zipCode",
      "add"."lat",
      "add"."lng",
      "d"."description",
      "d"."ages2-5",
      "d"."ages5-12",
      "i"."imageId",
      "i"."url",
      "i"."caption"
    from "activities" as "a"
    join "addresses" as "add" using ("addressId")
    join "descriptions" as "d" using ("activityId")
    join "images" as "i" using ("activityId");
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
