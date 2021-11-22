# Backend Challenge

Create a service to allowed to filter the data obtained from an external API that does not allow the filter of any kind, the data of this is updated every N hours, in the update they can disappear or add elements.

Based on the example build filters for each of these categories id, eyeColor, tags,

To complete the execution, you must work on the ./src folder, you can add as many files and dependencies as required. In the same way, images can be added to the Dockerfile if a service is required, eg databases.

It can include databases, cronjobs, system scripts, etc. if necessary, the important thing is to provide filtering speed, up-to-date and consistent data.

### URLs

The base code must be completed for the following URLs to work correctly, the first returns a single element, the second all matches.

- `/users/:id`
- `/users?filter=value`

You can explore the tests to learn a little about the expected performance.

### Sample data

```js
[{
  "_id": "5f7e0c4bc17a34141a957b59",
  "index": 0,
  "guid": "8e4ba647-a4da-4d45-b92a-6d9230484227",
  "isActive": false,
  "balance": "$2,648.30",
  "picture": "http://placehold.it/32x32",
  "age": 23,
  "eyeColor": "blue", // one of ("blue", "brown", "green")
  "name": {
    "first": "Roslyn",
    "last": "Pickett"
  },
  "company": "EWAVES",
  "email": "roslyn.pickett@ewaves.me",
  "phone": "+1 (856) 400-3165",
  "address": "479 Sumner Place, Vowinckel, Puerto Rico, 4398",
  "about": "Mollit eu voluptate qui do duis elit officia anim.",
  "registered": "Friday, July 24, 2015 8:18 PM",
  "latitude": "-28.502876",
  "longitude": "-64.265012",
  "tags": [ "irure", "est", "aute", "cillum", "dolore" ], // dynamic dic
  "range": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
  "friends": [
    { "id": 0, "name": "Sandoval Sawyer" },
    { "id": 1, "name": "Bernadine Bass" },
    { "id": 2, "name": "Bobbie Lee" }
  ],
  "greeting": "Hello, Roslyn! You have 9 unread messages.",
  "favoriteFruit": "strawberry" // one of ('apple', 'banana', 'strawberry')
}]
```

### Extra points

Extra points, Improve the score.

- Filtered by geo-zone `[latitude, longitude]`
- Date range on `registered`
- Filtered by `friends` by `name`
- Filtering by multiple `tags` (like` / users? Tags = value1, value2, value3`)
- Be able to combine two or more filters (like `/ users? Filter = value & filter2 = value2`)
- Sort by date of registration `registered`
- Include cache and/or search optimization
- Complement the tests
- Understand and adhere to the style code
- Constant and clear commis
- 
### Run enviroment

```sh
# before to start make a fork
git clone https://github.com/{{githubuser}}/backend-challenge
cd backend-challenge
docker-compose build
docker-compose up

# To run test
docker ps # To show id of containers `backend-challenge_src`
docker exec -it container_id bash
npm run test
```
### Delivery process

- First, you must create a fork of this repository
- Works and sends constant commits to the repository in personal
- Send a pull request to the original repo (extra points)
- Send the address of your fork (the repo in your user)

### Notes

-Filter by date range it is possible using lte, lt, gte and gt operators 
