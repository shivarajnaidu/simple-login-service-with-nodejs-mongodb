
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
