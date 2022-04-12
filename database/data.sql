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
);

insert into "activities" (
  "activityId"
  "activityName",
  "userId",
  "addressId"
) values (
  1,
  'Victory Park',
  1,
  1
), (
  2,
  'Adventure Playground',
  1,
  2
), (
  3,
  'Parasol Park',
  1,
  3
), (
  4,
  'Heritage Community Park',
  1,
  4
), (
  5,
  'Fallbrook Park'
  1,
  5,
);

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
), (
  3,
  "375 Magnet",
  "Irvine",
  92618,
  33.68044385566136,
  -117.73518891542894
), (
  4,
  "14301 Yale Ave",
  "Irvine",
  92604,
  33.700352220501756,
  -117.7797393307703
), (
  5,
  "75 Fallbrook",
  "Irvine",
  92604,
  33.67999087253852,
  -117.78301396330183
);

insert into "images" (
  "imageId",
  "activityId",
  "url",
  "caption"
) values (
  1,
  1,
  'https://s3-media0.fl.yelpcdn.com/bphoto/ffBHq176CStn3BwhMqpOIw/o.jpg',
  'victory park playground full view'
), (
  2,
  1,
  'https://s3-media0.fl.yelpcdn.com/bphoto/c0qB4cplIKx7sY4qkHz-QQ/o.jpg',
  'victory park climbing structures'
), (
  3,
  1,
  'https://s3-media0.fl.yelpcdn.com/bphoto/ytIbjfa0W5G6sFbpazt3YQ/o.jpg',
  'victory park swings'
), (
  4,
  1,
  'https://s3-media0.fl.yelpcdn.com/bphoto/p3pAwdkwJzRIX2x-mSsfkA/o.jpg',
  'victory park upper level'
), (
  5,
  2,
  'https://s3-media0.fl.yelpcdn.com/bphoto/n7OjGTC97B60QpLjX-2EuQ/o.jpg',
  'adventure playground play structure'
), (
  6,
  2,
  'https://s3-media0.fl.yelpcdn.com/bphoto/N2-8jUGZkRUSZB55x1zv0Q/o.jpg',
  'adventure playground shaded seating area'
), (
  7,
  2,
  'https://s3-media0.fl.yelpcdn.com/bphoto/cjL-zw9YkrrW0kaUBbJLXA/o.jpg',
  'adventure playground giant legos'
), (
  8,
  2,
  'https://s3-media0.fl.yelpcdn.com/bphoto/ByKhoiva-CHg3B3648f3kA/o.jpg',
  'adventure playground entrance'
), (
  9,
  3,
  'https://s3-media0.fl.yelpcdn.com/bphoto/hpYkrqQA9vkrf8OmkDtJUw/o.jpg',
  'parasol park overview'
), (
  10,
  3,
  'https://s3-media0.fl.yelpcdn.com/bphoto/vVxc4saU6tuOUBidCxwsvQ/o.jpg',
  'parasol park swings'
), (
  11,
  3,
  'https://s3-media0.fl.yelpcdn.com/bphoto/9ja7a3GLtBfEjeaCgfV0Zw/o.jpg',
  'parasol park play structure'
), (
  12,
  3,
  'https://s3-media0.fl.yelpcdn.com/bphoto/Hq6MRvKnJ8coMFVkHcUIMA/o.jpg',
  'parasol park neighborhood garden'
), (
  13,
  4,
  'https://s3-media0.fl.yelpcdn.com/bphoto/QzKn6H4ODqI1hGfdPVbudg/o.jpg',
  'heritage park playground'
), (
  14,
  4,
  'https://s3-media0.fl.yelpcdn.com/bphoto/Y-igrhYLEPt2cwZje0qR8Q/o.jpg',
  'heritage park lake'
), (
  15,
  4,
  'https://s3-media0.fl.yelpcdn.com/bphoto/ugUl7LgF0__25GAS7Z9HLQ/o.jpg',
  'heritage park small playground'
), (
  16,
  4,
  'https://s3-media0.fl.yelpcdn.com/bphoto/Mh3rQFP60WUaQjhu-fklmg/o.jpg',
  'heritage park water play'
), (
  17,
  5,
  'https://s3-media0.fl.yelpcdn.com/bphoto/p0djEdSpOj1RtXyzUAPSjg/o.jpg',
  'fallbrook splash pad'
), (
  18,
  5,
  'https://s3-media0.fl.yelpcdn.com/bphoto/4j0EULkBaHeh6a15pfaPVQ/o.jpg',
  'fallbrook play structure'
), (
  19,
  5,
  'https://ap.rdcpix.com/c335990e6778fa382528b9bbb3d3a2f4l-m961033455s-w642_h420_q75.jpg',
  'fallbrook from above'
), (
  20,
  5,
  'https://ssl.cdn-redfin.com/photo/45/mbphoto/895/genMid.OC14106895_21_1.jpg',
  'fallbrook swings'
);

insert into "descriptions" (
  "descriptionId",
  "userId",
  "activityId",
  "description",
  "defaultDescription",
  "ages2-5",
  "ages5-12"
) values (
  1,
  1,
  1,
  "Amazing playground! Brand new, maintained very well, lot of areas for kids to play! I especially like how there are different sections for different ages. They even have a smaller playplace for the very young toddlers. This playground is enormous! The designers of this playground covered every fun, entertaining, and interactive feature a playground could have, while honoring the Marine Corp and blimp history.
  /r/n One of the cool things about this playground is that it's perfect for all ages since it has a smaller section for toddlers and the bigger area for all the other ages including teenagers. The kids can climb on the spider webs, slide down the various size slides, spin, balance, swing, and even play a tune. There are also benches, tables, bbq grills, and a big green area for playing ball, running around, or just to relax and have a picnic. In the garden area you won't find flowers, but you will have benches where you can sit and read about the history of the area.",
  'true',
  'true',
  'true'
), (
  2,
  1,
  2,
  "Totally enclosed play area with a staff member at the gate. Dirt, water, sand, playground, and toys like giants legos and little dump trucks to play with. Some chairs around for parents and a little shade, but will be hot and sunny in the summer. The street address will park you to the side of the adventure playground. There's a closer parking lot  across from the entrance you can maybe drop a pin to get a little closer if you need to. Bathrooms are there, although a little rough. A few shady picnic tables at the front, although they filled up fast and no one seemed to move away from them the whole time I was there. But there is a huge park outside the adventure playground that is ideal for picnicking and playing./r/n The parking lot is limited in space because it is next to a public library, but thankfully the parking lot is separated. If the parking lot were to be full, the overflow would surely be the park lot. We went during the weekend in the afternoon, so my observation was that it is full in the mornings. The location has two restroom with changing tables, and it is deceiving at a glance. The outside appears to be a run down CONNEX but the inside looks like a well maintained public restroom. The door is not automatic but it is large enough to push in a stroller alone.",
  'true',
  'true',
  'true'
), (
  3,
  1,
  3,
  "Parasol Park is a compact community space that has a combination basketball/volleyball court, shaded areas with picnic tables, community planting beds, and landscaped areas along the perimeter, complete with faux footbridges to give the impression that you're entering a nature retreat. There's also a building that may have once been the subdivision's sales office and could now be (or ought to be) a community center.
  /r/n The wooden play structures don't have any slides and the ladders into them maybe challenging for littles to climb. Zipline too scary for some littles. I don't recall any swings. There's resident amenities like community garden and ping pong tables and pool. Not much shade either. Street parking. Just across the street is Bosque Trail, another option that has play equipment and bathrooms."
), (
  4,
  1,
  4,
  "Heritage Park is a great spot to eat your takeout and enjoy the cool breeze, the scenery, and relax. The pond is full of all types of ducks/geese including baby ducks! There's a nice paved path to walk around, a good number of tables and benches, good parking, and lots of activities.
  /r/n There are many things to do for both kids and adults.  The playground has 2 large play structures for infants and older kids respectively as well as a sand pit. There are swings for all ages as well as a splash pad. There is also a nice picnic area for parties, a small lake to walk around and read. The small lake is filled with turtles, ducks, and fish.Big fields and grassy area to play sports"
), (
  5,
  1,
  5,
  " Play equipment 2-5 and 5-12 with two toddler and two big kid swings over foam terrain with a small sand pit.  Two covered picnic tables on each side of playground (one with hand sanitizer dispenser).  No shade over the play equipment. The splash pad and pool are gated. Some grass area. Compared to other playground equipment in Woodbridge, this is the newest I've seen.
  /r/n This is an association splash pad (so you'll need a key card for entry). We got tons of use out of the South Lake Beach Club (lagoon) over the summer but heard of this splash pad and thought it would be a quicker alternative. It's great! The splash pad was fun for my 2 and 4 year old boys. I will say there is a weird timer/motion setting that we couldn't quite figure out and even the lifeguards couldn't quite help. This splash pad is adjacent to a kiddie wading pool and the regular swimming pool - so be careful if you have little ones as the splash pad is not fenced in and little ones could wander off. Over all a great alternative to the pool."
);
