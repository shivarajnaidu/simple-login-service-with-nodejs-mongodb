# simple-login-service-with-nodejs-mongodb
Simple Login Service Using NodeJs And MongoDB

## How To ...

Before starting node server.. Start your mongodb
then install dependencies with `npm install` and run `npm start` to start the node server.

PORT: default port is 3000

## API Signatures:

### POST /api/auth/signup

### Sample Input:

```json
{
    "role": "user", // Optional Param.. (Default Value Is "user")
    "name": "yuvaraj",
    "email": "shivarajnaidu@gmail.com",
    "password": "testpassword"
}
```

### Sample Output:

```json
{
    "role": "user",
    "isActive": true,
    "_id": "5b2cd875a2254736588cbff5",
    "email": "shivarajnaidu@gmail.com",
    "name": "yuvaraj",
    "password": "$2b$10$SEYSJa6txYwM5MmEx0wP3.uZmLtzQhcBbJXFpXagCpEjsIxuh067W",
    "id": "a4db60bb-e9cb-4573-9528-404a6305aca3",
    "createdAt": "2018-06-22T11:07:33.851Z",
    "updatedAt": "2018-06-22T11:07:33.851Z",
    "__v": 0
}
```


### POST /api/auth/login

### Sample Input:

```json
{
    "email": "shivarajnaidu@gmail.com",
    "password": "testpassword"
}
```
### Sample Output:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhcmFqbmFpZHVAZ21haWwuY29tIiwiaWQiOiJhNGRiNjBiYi1lOWNiLTQ1NzMtOTUyOC00MDRhNjMwNWFjYTMiLCJpYXQiOjE1Mjk2NjU3NjksImV4cCI6MTUyOTY2OTM2OX0.m4-fHQ0-cv0slbC-GGMOBrQZY4ngmTm3eh7RLcJjyDw"
}
```