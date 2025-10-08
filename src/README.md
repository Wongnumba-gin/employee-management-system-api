Take-Home Examination: Employee Management System API (Beginner Level)
Welcome to the take-home examination for the Junior TypeScript Developer position. This project is designed to assess your fundamental skills in building a RESTful API with TypeScript, Express.js, and Firebase/Firestore.

Project Overview
You are tasked with building a simple Employee Management System API. This API will serve as the backend for an internal company application, allowing for the management of departments, positions, and employees, as well as tracking employee time logs.

Core Technologies
Language: TypeScript

Framework: Node.js / Express.js

Database: Google Firestore

API Testing: Postman (or any similar tool)

Part 1: Setup & Instructions
Your first task is to get the project running and understand the existing structure.

Your Task:

Create Your Own Public GitHub Repository: Create a new, empty, public repository under your own GitHub account. You will push your code here and submit the link for review.

Set Up the Project Locally: Clone this starter code onto your machine.

Firebase Setup:

Create a new Firebase project in the Firebase Console.

Inside your new project, go to the "Firestore Database" section and create a new database. Start in test mode for this exam.

Go to Project Settings (click the gear icon) -> Service Accounts.

Click "Generate new private key" to download the service account JSON file. Warning: Keep this file secure and do not commit it to GitHub.

Project Configuration:

Create a .env file in the root of the project. You can copy .env.example and rename it.

You need to provide the content of the JSON file you downloaded to the application via an environment variable. To do this, Base64-encode the entire content of the JSON file. You can use an online tool (like base64encode.org) or a command-line utility.

Set FIREBASE_SERVICE_ACCOUNT_BASE64 in your .env file with the resulting Base64 string.

Set PORT to 8080 or another port of your choice.

Install Dependencies & Run:

Open your terminal in the project folder and run npm install.

Run npm run dev to start the development server. The server will automatically restart when you save changes.

If everything is set up correctly, you should see a "Server is running..." message in your console.

Part 2: Feature Implementation
Your main task is to implement the logic for the API endpoints. The project structure, routes, and controller function shells have already been created for you. You will need to fill in the // TODO: sections in the controller files.

1. CRUD for Departments
File: src/controllers/department.controller.ts

Implement the functions to create, read (all and by ID), update, and delete departments.

Data Model:

id (string, Firestore auto-generated)

name (string, e.g., "Engineering")

createdAt (Timestamp)

2. CRUD for Positions
File: src/controllers/position.controller.ts

Implement the functions to create, read, update, and delete positions.

A Position belongs to a Department.

Data Model:

id (string, Firestore auto-generated)

title (string, e.g., "Senior Software Engineer")

departmentId (string, a reference to a document in the departments collection)

createdAt (Timestamp)

3. CRUD for Employees
File: src/controllers/employee.controller.ts

Implement the functions to create, read, update, and "delete" employees.

When creating an employee, you should also assign them a positionId and departmentId.

The DELETE operation should be a soft delete. Instead of removing the record, set the isActive flag to false.

Data Model:

id (string, Firestore auto-generated)

employeeId (string, a unique identifier you generate, e.g., "EMP-001")

firstName (string)

lastName (string)

email (string, must be unique)

positionId (string, reference to a positions document)

departmentId (string, reference to a departments document)

hireDate (Timestamp)

isActive (boolean, defaults to true)

createdAt (Timestamp)

4. Employee Time In & Time Out
File: src/controllers/attendance.controller.ts

Implement the timeIn and timeOut functions.

These actions should create a new record in an attendance subcollection within a specific employee's document.

You'll need the employeeId to know who is timing in/out.

Data Model (for an attendance record):

id (string, Firestore auto-generated)

timestamp (Timestamp, the time of the event)

type (string, either "time-in" or "time-out")

location (string, for this exam, you can hardcode it to "BGC, Taguig City Office")

Implement the getAttendanceRecords function to retrieve all time logs for a specific employee.

Plus Points (Optional)
If you finish the core tasks, consider implementing the following for bonus points:

Input Validation: Add basic validation to your create and update endpoints. For example, ensure that the name field for a department is not an empty string. Return a 400 Bad Request status code for invalid input.

Error Handling: Improve the error handling. For example, when a user requests an employee by an ID that doesn't exist, return a 404 Not Found status code with a clear message.

Submission
To submit your work, please provide the public URL to your completed GitHub repository. Make sure your final commit history is clean and demonstrates your development process.

Good luck!
