//departmentRoutes.js - Defines the URLs for managing all Department records. |||| Set up the router and load the controller functions
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController'); 

//--- Department Endpoints (The URLs) ---

//Handles creating a new department (POST /api/departments)
router.post('/', departmentController.createDepartment);

//Handles viewing all departments (GET /api/departments)
router.get('/', departmentController.getDepartments);

//Handles viewing a specific department by its ID (GET /api/departments/:id)
router.get('/:id', departmentController.getDepartmentById); 

//Handles updating a specific department by its ID (PUT /api/departments/:id)
router.put('/:id', departmentController.updateDepartment); 

//Handles deleting a specific department by its ID (DELETE /api/departments/:id)
router.delete('/:id', departmentController.deleteDepartment); 

//Make these routes available to the main application
module.exports = router;