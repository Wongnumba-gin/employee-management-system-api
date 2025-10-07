import { Request, Response, NextFunction } from 'express';
import { getDb } from '../config/firebase';

export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to create an employee.
        // 1. Get employee details from req.body.
        // 2. Generate a unique employeeId (e.g., 'EMP-001'). You might need to check the last created employee to increment the number.
        // 3. Set 'isActive' to true and add 'hireDate' and 'createdAt' timestamps.
        // 4. Save to the 'employees' collection.
        // 5. Return the new employee with a 201 status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to get all employees.
        // Consider filtering for active employees only, e.g., where('isActive', '==', true)
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to get a single employee by their Firestore document ID.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to update an employee's details (e.g., position, department).
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement SOFT DELETE logic.
        // 1. Get employee ID from req.params.
        // 2. Update the employee's 'isActive' status to false.
        // 3. Return a 200 status with a success message.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};
