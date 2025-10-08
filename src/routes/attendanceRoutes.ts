//attendanceRoutes.js - Defines the routes (URLs) for employee clocking and attendance history. ||| Bring in Express to create the router and load the controller functions
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); 

//--- Attendance Endpoints ---

//Handles employee clocking in (POST /api/attendance/time-in)
//Requires the employee's ID in the request body.
router.post('/time-in', attendanceController.timeIn);

//Handles employee clocking out (POST /api/attendance/time-out)
//Requires the employee's ID in the request body.
router.post('/time-out', attendanceController.timeOut);

//Retrieves an employee's full attendance history (GET /api/attendance/:employeeId/records)
//The employee's custom ID is taken from the URL path.
router.get('/:employeeId/records', attendanceController.getAttendanceRecords);

//Make these routes available to the main application
module.exports = router;