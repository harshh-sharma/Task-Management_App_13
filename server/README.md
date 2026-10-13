# Task Manangement App
This Task Management App where user create , update , delete and show there all task 

- To Install the package just run the following command
  npm i express bcrypt jsonwebtoken mongoose cors dotenv (dependencies)
  npm i -D nodemon (dev dependencies)

- To run just write
  npm run dev
 


# User
-   For this I design user authentication with jwt 
-   user model schema - name, email and password

# Task 
- In Task modules user create there task , update it and delete it and all see all tasks
- Task model schema - title , description and isCompleted status of task
- user only able to delete there task 


# user Endpoints
 - Here are below user points and what has to been send via json body 
 - API URL = http://localhost:3000/api/user
  
 - Register
      API URL = POST http://localhost:3000/api/user/register
      {
        name:"Harsh",
        email:"harsh@gmail.com",
        password:"123456"
      }

 - Login 
     API URL = POST http://localhost:3000/api/user/login
    {
        email:"harsh@gmail.com",
        password:"123456"
    }

 - Profile
    API URL = http://localhost:3000/api/user/profile
    you have just send Authorization Bearer Token in header

   

# Task Endpoints
 - Here are below user points and what has to been send via json body 
 - API URL = http://localhost:3000/api/task
  
 - GET for get all task and post for create task
      API URL = POST http://localhost:3000/api/task
      This structure for creating task - {
        title:"Task title",
        description:"Task description"
      }

 - To update ,get and delete specific task  
     API URL = POST http://localhost:3000/api/task/taskId
     - Delete task just you have to send task id and authorization bearer token in header and same for get specific task 

     - To update taks you have send feilds that you have you have to update it via json along with headers that authorization bearer token

