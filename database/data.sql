insert into "users" (
  "userId",
  "username",
  "hashedPassword",
  "firstName",
  "lastName",
  "email"
) values (
  '1',
  'demo',
  'temp',
  'Demo',
  'Account',
  'demo@example.com'
)

insert into "activities" (
  "activityName",
  "userId",
  "addressId"
) values (
  'Victory Park',
  1,
  1
), (
  'Adventure Playground',
  1,
  2
), (
  'Parasol Park',
  1,
  3
)

insert into "addresses" (
  "addressId",
  "streetAddress",
  "city",
  "zipCode",
  "lat",
  "lng"
) values (
  1,
  "3300 Park Ave",
  "Tustin",
  92782,
  33.703203945718606,
  -117.81749149260851
), (
  2,
  "1 Beech Tree Ln",
  "Irvine",
  92612,
  33.660372181185224,
  -117.82025108659401
)
