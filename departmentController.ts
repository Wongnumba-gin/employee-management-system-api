import { Request, Response, NextFunction } from 'express';
import { getDb } from '../config/firebase';

export const createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to create a department.
        // 1. Get 'name' from req.body.
        // 2. Add a new document to the 'departments' collection.
        // 3. Include a 'createdAt' timestamp.
        // 4. Return the new department with a 201 status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const getAllDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to get all departments.
        // 1. Query the 'departments' collection.
        // 2. Return an array of departments with a 200 status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to get a single department by its ID.
        // 1. Get department ID from req.params.
        // 2. Fetch the document from Firestore.
        // 3. If not found, return 404.
        // 4. Return the department data with a 200 status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to update a department.
        // 1. Get department ID from req.params and 'name' from req.body.
        // 2. Update the document in Firestore.
        // 3. Return the updated department data with a 200 status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // TODO: Implement logic to delete a department.
        // 1. Get department ID from req.params.
        // 2. Delete the document from Firestore.
        // 3. Return a 204 No Content status.
        res.status(501).json({ message: 'Not Implemented' });
    } catch (error) {
        next(error);
    }
};
