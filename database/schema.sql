set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "activities" (
	"activityId" serial NOT NULL,
	"userId" integer NOT NULL,
	"activityName" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"lastModified" TIMESTAMP NOT NULL default now(),
	"ages2to5" BOOLEAN NOT NULL,
	"ages5to12" BOOLEAN NOT NULL,
  "streetAddress" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"zipCode" integer NOT NULL,
	"lat" FLOAT NOT NULL,
	"lng" FLOAT NOT NULL,
	CONSTRAINT "activities_pk" PRIMARY KEY ("activityId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "images" (
	"imageId" serial NOT NULL,
	"activityId" integer NOT NULL,
	"url" TEXT NOT NULL,
	"caption" TEXT NOT NULL,
	"lastModified" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "bookmarks" (
	"bookmarkId" serial NOT NULL,
	"activityId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "bookmarks_pk" PRIMARY KEY ("bookmarkId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "activities" ADD CONSTRAINT "activities_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("activityId") REFERENCES "activities"("activityId");
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk0" FOREIGN KEY ("activityId") REFERENCES "activities"("activityId");
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
