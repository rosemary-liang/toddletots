set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "activities" (
	"activityId" serial NOT NULL,
	"userId" integer NOT NULL,
	"activityName" TEXT NOT NULL,
	"addressId" integer NOT NULL,
	CONSTRAINT "activities_pk" PRIMARY KEY ("activityId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "addresses" (
	"addressId" serial NOT NULL,
	"streetAddress" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"zipCode" integer NOT NULL,
	"lat" FLOAT NOT NULL,
	"lng" FLOAT NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("addressId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "images" (
	"imageId" serial NOT NULL,
	"activityId" integer NOT NULL,
	"url" TEXT NOT NULL,
	"caption" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "descriptions" (
	"descriptionId" serial NOT NULL,
	"userId" integer NOT NULL,
	"activityId" integer NOT NULL,
	"description" TEXT NOT NULL,
	"lastModified" TIMESTAMP NOT NULL default now(),
	"defaultDescription" BOOLEAN NOT NULL,
	"ages2-5" BOOLEAN NOT NULL,
	"ages5-12" BOOLEAN NOT NULL,
	CONSTRAINT "descriptions_pk" PRIMARY KEY ("descriptionId")
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
ALTER TABLE "activities" ADD CONSTRAINT "activities_fk1" FOREIGN KEY ("addressId") REFERENCES "addresses"("addressId");
ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("activityId") REFERENCES "activities"("activityId");
ALTER TABLE "descriptions" ADD CONSTRAINT "descriptions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "descriptions" ADD CONSTRAINT "descriptions_fk1" FOREIGN KEY ("activityId") REFERENCES "activities"("activityId");
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk0" FOREIGN KEY ("activityId") REFERENCES "activities"("activityId");
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
