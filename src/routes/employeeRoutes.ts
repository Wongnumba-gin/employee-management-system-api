//employeeRoutes.js - Defines the URLs for managing all Employee records.

//Set up the router and load the controller functions
const express = require('express');
const router = express.Router();

//Loads the logic handler for all employee operations
const employeeController = require('../controllers/employeeController'); 

//--- Employee Endpoints (The URLs) ---

//Handles hiring a new employee (POST /api/employees)
router.post('/', employeeController.createEmployee);

//Handles viewing the entire employee list (GET /api/employees)
router.get('/', employeeController.getAllEmployees);

//Handles viewing a specific employee by their Firestore ID (GET /api/employees/:id)
router.get('/:id', employeeController.getEmployeeById); 

//Handles updating an employee's record (PUT /api/employees/:id)
router.put('/:id', employeeController.updateEmployee); 

//Handles removing an employee (Soft Delete) by ID (DELETE /api/employees/:id)
router.delete('/:id', employeeController.deleteEmployee); 

//Make these routes available to the main application
module.exports = router;