require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.get('/api/activities', (req, res, next) => {
  const sqlActivities = `
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
      "d"."ages2_5",
      "d"."ages5_12"

    from "activities" as "a"
    join "addresses" as "add" using ("addressId")
    join "descriptions" as "d" using ("activityId")
  `;

  db.query(sqlActivities)
    .then(resultActivities => {
      const activities = resultActivities.rows;

      const sqlImages = `
        select
          "i"."imageId",
          "i"."url",
          "i"."caption",
          "i"."activityId"

        from "images" as "i"
      `;

      db.query(sqlImages)
        .then(resultImages => {
          const images = resultImages.rows;
          const finalData = activities.map(activity => {
            const filteredImages = images.filter(image => activity.activityId === image.activityId);
            activity.images = filteredImages;
            return activity;
          });
          res.json(finalData);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
