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