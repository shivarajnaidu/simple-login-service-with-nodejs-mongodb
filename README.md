# simple-login-service-with-nodejs-mongodb
Simple Login Service Using NodeJs And MongoDB

## How To ...

Before starting node server.. Start your mongodb
then install dependencies with `npm install` and run `npm start` to start the node server.

PORT: default port is 3000

## API Signatures:

## Signup API

### POST /api/auth/signup

### Sample Input:

```json
{
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

## New Account Verification API

### GET /api/auth/signup

### Sample Input:

```json
{
    "otp": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiI2OGFmYjIxOC1iZTYyLTRkY2UtYjBkYy03Nzc1NjFhZWYxZGUiLCJpYXQiOjE1MzY5MjM1MTEsImV4cCI6MTUzNjkyNzExMX0.1iQW3gxwxhCRKrtdg1r7dBu3FnUxDQxYPnQQC5rT7i8"
}
```
### Sample Output

```json
{
    "message": "Your Account Has Been Verified Successfully.. You Can Login Now.."
}
```

## Login API

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

## Forgot Password API

### POST /api/auth/forgot-password

### Sample Input:

```json
{
    "email": "shivarajnaidu@gmail.com"
}
```

### Sample Output:

```json
{
    "message": "Password Reset Email Sent To Your Email.. Please Use That Link To Reset Your Password"
}
```


## Reset Password API

### POST /api/auth/reset-password

### Sample Input:

```json
{
    "otp": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvdHAiOiI5MTk4NGMwNC00ZTE5LTRhYTAtOTNjOC0yNTMzNWViNTNhMDUiLCJpYXQiOjE1MzY5MjY3MTgsImV4cCI6MTUzNjkzMDMxOH0.hlk5b4j1fX50VB64YVGFAkNLvEnYiO8ZvBEdeSRZtlw",
    "password": "test-password"
}
```

### Sample Output:

```json
{
    "message": "Password Updated Successfully"
}
```
