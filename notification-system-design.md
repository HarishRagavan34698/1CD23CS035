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
<tr><th>HTTPMethod</th> <th>Action</th> <th>SQL Query </th></tr>
<tr><td>GET</td> <td>Read data</td> <td>SELECT * FROM users WHERE id = 1;<td></tr>
<tr><td>POST</td> <td>Create data</td> <td>INSERT INTO users (name) VALUES ('Alice');</td></tr>
<tr><td>PUT</td> <td>Update data</td> <td>UPDATE users SET name = 'Bob' WHERE id = 1;</td></tr>
<tr><td>DELETE</td> <td>Remove data</td> <td>DELETE FROM users WHERE id = 1;</td></tr>
</table>



# Stage 3
It's accurate but will perform slowly due to the fact that it has to go through the entire database.It would be around 5,050,000 approx. You can create index but on every column will slow you down, so just limit it to the most frequent columns. 

## SQL query

SELECT student_id, student_name, notification_date
FROM placement_notifications
WHERE notification_date >= CURRENT_DATE - INTERVAL '7 days' AND notification_type == "Placement"
ORDER BY notification_date DESC;


# Stage 4
(1) Identify the bottlenecks
(2) Kill runaway queries and add a limit.
(3) Clean up data and optimize the schema
(4) Scale your software both vertically and horizontally

# Stage 5
Saving and sending must occur together cause if not then might see that all are sent but only some are stored/ all are stored and only some are sent, the records won't match. I would do both together and only go to the 3rd is it is succesfully sent and saves to all. I will maintain a count variable.

function notify_all(student_ids: array, message: string):\
 for student_id in student_ids:\
  send_and_save_email(student_id,message)\
  if(count==50,000)\
   push_to_app(student_id,message)

# Stage 6

import java.time.Instant;\
import java.util.*\

record Element(String id, int placement, int result, int event, Instant recency) {}\

public class Main {\
    public static void main(String[] args) {\
        // Comparator chained exactly by weight hierarchy\
        Comparator<Element> weight = Comparator\
            .comparingInt(Element::placement)\
            .thenComparing(Element::result, Comparator.reverseOrder())\
            .thenComparing(Element::event, Comparator.reverseOrder())\
            .thenComparing(Element::recency, Comparator.reverseOrder());\

        PriorityQueue<Element> pq = new PriorityQueue<>(weight);\

        Instant now = Instant.now();\
        pq.add(new Element("A", 2, 90, 5, now));\
        pq.add(new Element("B", 1, 80, 5, now));\
        pq.add(new Element("C", 1, 80, 5, now.plusSeconds(10)));\

        while (!pq.isEmpty()) System.out.println(pq.poll().id());\
    }\
}\

