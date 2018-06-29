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
    "role": "user",
    "name": "yuvaraj",
    "email": "shivarajnaidu@gmail.com",
    "password": "testpassword"
}
```

### Sample Output:

```json
{
    "message": "Verification Email Sent To Your Email Id.. Please Verify Your Email By Clicking The Verification Link"
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhcmFqbmFpZHVAZ21haWwuY29tIiwicHJvdmlkZXIiOiJsb2NhbCIsInVzZXJJZCI6IjhlODc4NmZjLWU5MmQtNGM2NC1hYmI4LTg0MTgzMzgyNDYzNCIsInByb2ZpbGVJZCI6ImFkNGFhZjE3LWY5YjEtNDM3MS1iNzU0LWQzYmFlZDUxOTVhMCIsImlhdCI6MTUzMDI3NDY1MCwiZXhwIjoxNTMwMjc4MjUwfQ.NJjZeMnMB3bPsSTAbFkQy3N8dTHyretRHB3ii1LWVqM"
}
```