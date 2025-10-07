import { Router } from 'express';
import * as employeeController from '../controllers/employee.controller';
import * as attendanceController from '../controllers/attendance.controller';

const router = Router();

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee); // Soft delete

// Route to get attendance for a specific employee
router.get('/:employeeId/attendance', attendanceController.getAttendanceRecords);

export default router;
