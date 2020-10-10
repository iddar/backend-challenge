db = db.getSiblingDB('db');
db.createCollection('users');
db.users.createIndex({ registeredDate: 1, latitude: 1, longitude: 1 });
db.users.createIndex({ "friends.name": 1 });
db.users.createIndex({ tags: 1 });
db.users.createIndex({ geozone: '2dsphere' });
