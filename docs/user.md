## User API

### GET /api/users

### Sample Input:

None

### Sample Output

```json
[
    {
        "role": "user",
        "isActive": true,
        "isDeleted": false,
        "loginIp": "",
        "lastLoginProvider": "",
        "currentLoginProvider": "",
        "_id": "5c277b1dd89adf4be0497a61",
        "email": "shivarajnaidu@gmail.com",
        "id": "0035c0aa-1fc9-412c-a41f-6d623697e5fc",
        "lastLogin": "2018-12-29T13:48:13.104Z",
        "currentLogin": "2018-12-29T13:48:13.105Z",
        "createdAt": "2018-12-29T13:48:13.111Z",
        "updatedAt": "2018-12-29T13:48:13.111Z",
        "__v": 0
    }
]
```


### GET /api/users/:id

### Sample Input:

`id - User Id `

### Query Params
`profiles - fb | google | local`

### Sample Output

```json
{
    "_id": "5c277b1dd89adf4be0497a61",
    "role": "user",
    "isActive": true,
    "isDeleted": false,
    "loginIp": "",
    "lastLoginProvider": "",
    "currentLoginProvider": "",
    "email": "shivarajnaidu@gmail.com",
    "id": "0035c0aa-1fc9-412c-a41f-6d623697e5fc",
    "lastLogin": "2018-12-29T13:48:13.104Z",
    "currentLogin": "2018-12-29T13:48:13.105Z",
    "createdAt": "2018-12-29T13:48:13.111Z",
    "updatedAt": "2018-12-29T13:48:13.111Z",
    "__v": 0,
    "profiles": []
}
```