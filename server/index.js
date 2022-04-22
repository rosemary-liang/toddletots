require('dotenv/config');
const express = require('express');
const db = require('./db');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/activities', (req, res, next) => {
  const sqlActivities = `
   select
      "activityId",
      "activityName",
      "streetAddress",
      "city",
      "zipCode",
      "lat",
      "lng",
      "description",
      "ages2to5",
      "ages5to12",
      "userId"

    from "activities"

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
      "activityId",
      "activityName",
      "streetAddress",
      "city",
      "zipCode",
      "lat",
      "lng",
      "description",
      "ages2to5",
      "ages5to12",
      "userId"

    from "activities" as "a"
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

app.post('/api/activities', (req, res, next) => {
  const userId = 1;
  const { activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, currentCoordinates, url, caption } = req.body;
  const { lat, lng } = currentCoordinates;

  const sqlActivities = `
  insert into "activities"
    (
    "userId",
    "activityName",
    "streetAddress",
    "city",
    "zipCode",
    "description",
    "ages2to5",
    "ages5to12",
    "lat",
    "lng"
    )
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  returning *
  `;
  const paramsActivities = [userId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, lat, lng];
  db.query(sqlActivities, paramsActivities)
    .then(newActivity => {
      // console.log(newActivity);
      const [activity] = newActivity.rows;
      const newActivityId = activity.activityId;
      const sqlImages = `
      insert into "images"
      (
        "activityId",
        "url",
        "caption"
      )
      values ($1, $2, $3)
      returning *
      `;
      const paramsImages = [newActivityId, url, caption];
      db.query(sqlImages, paramsImages)
        .then(resultImages => {
          // console.log(resultImages);
          const [image] = resultImages.rows;
          activity.images = image;
          res.json(activity);
        })
        .catch(err => next(err));

    })
    .catch(err => next(err));
});

app.put('/api/activities/:activityId', (req, res, next) => {
  const activityId = Number(req.params.activityId);
  if (!activityId) {
    throw new ClientError(400, `cannot find activity with activityId ${activityId}`);
  }

  const { userId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, currentCoordinates } = req.body;
  const { lat, lng } = currentCoordinates;

  const sqlActivities = `
    update "activities"
    set "lastModified" = now(),
        "userId" = $1,
        "activityName" = $2,
        "streetAddress" = $3,
        "city" = $4,
        "zipCode" = $5,
        "description" = $6,
        "ages2to5" = $7,
        "ages5to12" = $8,
        "lat" = $9,
        "lng" = $10
    where "activityId" = $11
    returning *
  `;
  const paramsActivities = [userId, activityName, streetAddress, city, zipCode, description, ages2to5, ages5to12, lat, lng, activityId];
  db.query(sqlActivities, paramsActivities)
    .then(result => { return result; })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
