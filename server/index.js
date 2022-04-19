require('dotenv/config');
const express = require('express');
const db = require('./db');
const ClientError = require('./client-error');
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
          "imageId",
          "url",
          "caption",
          "activityId"

        from "images"
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

app.get('/api/activities/:activityId', (req, res, next) => {
  const activityId = Number(req.params.activityId);
  if (!activityId) {
    throw new ClientError(400, `cannot find activity with activityId ${activityId}`);
  }
  const params = [activityId];
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
    where "activityId" = $1
  `;
  db.query(sqlActivities, params)
    .then(result => {
      const [activity] = result.rows;
      // res.json(activity);
      const sqlImages = `
         select
          "imageId",
          "url",
          "caption",
          "activityId"

        from "images"
        where "activityId" = $1
      `;
      db.query(sqlImages, params)
        .then(resultImages => {
          if (!resultImages) {
            throw new ClientError(404, `cannot find images with activityId ${activityId}`);
          }
          activity.images = resultImages.rows;
          const finalData = activity;
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
