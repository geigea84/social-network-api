# social-network-api

These are the back-end routes and database for the social-network-api.  These routes allow you to:

## GET
- get all users
- get a user by id
- get all thoughts
- get a thought by id

## POST
- create a user
- add a friend
- create a thought
- add a reaction

## PUT
- update a user
- update a thought

## DELETE
- delete a user and their thoughts
- delete a friend
- delete a thought
- delete a reaction


### User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data


GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database


WHEN I open API GET routes in Insomnia Core for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON


WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete users and thoughts in my database


WHEN I test API POST and DELETE routes in Insomnia Core
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

### Demonstration Videos

https://drive.google.com/file/d/1_Cj7kzV2sja_buNOiCZYRgk46pHVasBy/view
https://drive.google.com/file/d/1JNXd_c9GKPGnb2WFiJXJtoQTT7v2Avut/view

1
start server

2 /
get all users

3 /
create a user

4 /:id
get one user by id

5 /:id
update a user

6 /:userId/friends/:friendId
add a friend

7 /:userId/friends/:friendId
delete a friend

8 /
get all thoughts

9 /
create a thought

10 /:id
get one thought by id

11 /:id
update a thought

12 /:id
delete a thought

13 /:thoughtId/reactions
add a reaction

14 /:thoughtId/reactions/:reactionId
delete a reaction

15 /:id
delete a user and their thoughts


### Technologies Used:
- MongoDB
- Mongoose
- Javascript
- Express.js
- Node.js

### Dependencies
- "express": "^4.17.1",
- "mongoose": "^5.11.11",
- "nodemon": "^2.0.7",
- "path": "^0.12.7",
- "router": "^1.3.5"