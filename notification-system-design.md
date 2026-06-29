# Notification System Design

# Stage 1

## GET all
http://localhost:3000/employees

JSON Request
{ }

JSON Response
[
  {
    "id": 1,
    "name": "John",
    "salary": 50000
  },
  {
    "id": 2,
    "name": "Emma",
    "salary": 60000
  },
  {
    "id": 3,
    "name": "David",
    "salary": 55000
  }
]

JSON header
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }


## GET one
http://localhost:3000/employees/:id

// http://localhost:3000/employees/:1

JSON Request
{ }

JSON Response
{
    "id": 1,
    "name": "John",
    "salary": 50000
}

JSON header
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

## POST
http://localhost:3000/employees

JSON Request
{
    "id": 4,
    "name": "emily",
    "salary": 70000
}

JSON Response
{
    "message": "created succesfully"
}

JSON header
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

## PUT one
http://localhost:3000/employees/:id

//http://localhost:3000/employees/:1

JSON Request
{
    "id": 1,
    "name": "Jacob",
    "salary": 98900
}

JSON Response
{
    "message":"Updated"
}

JSON header
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

## DELETE ONE
http://localhost:3000/employees/:id

//http://localhost:3000/employees/:1

JSON Request
{ }

JSON Response
{
    "message":"Deleted"
}

JSON header

  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

## Real-time notification system

(1) Client(Frontend):- It will connect to the server and authenticates the request.  
(2) Server(Backend):- Manages all open sockets and routes and reallocates according to needs and pushes data payloads.  
(3) Trigger(Database):- It simulates a system notification that fires when required.  


# Stage 2
I would suggest a structured DB since it makes sure the data you enter into it is formatted. So SQL is preffered. If data is increased the most probably are High Memory costs, Slow query performance, and concurrency. We must optimize queries to make sure they run fast, break large tables into manageable ranges and keep a separate storage for old inactive data compared to new ones.

<table>
<tr><th>HTTP MethodAPI ActionCorresponding SQL Query </th></tr>
<tr>GETRead dataSELECT * FROM users WHERE id = 1;</tr>
<tr>POSTCreate dataINSERT INTO users (name) VALUES ('Alice');</tr>
<tr>PUT / PATCHUpdate dataUPDATE users SET name = 'Bob' WHERE id = 1;</tr>
<tr>DELETERemove dataDELETE FROM users WHERE id = 1;</tr>
</table>