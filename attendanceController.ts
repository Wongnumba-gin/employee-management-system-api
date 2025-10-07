import { Request, Response, NextFunction } from 'express';
import { getDb } from '../config/firebase';
import { firestore } from 'firebase-admin';

// Helper function to find an employee document by their custom employeeId
const findEmployeeByCustomId = async (employeeId: string) => {
    const db = getDb();
    const employeeQuery = await db.collection('employees').where('employeeId', '==', employeeId).limit(1).get();
    if (employeeQuery.empty) {
        return null;
    }
    return employeeQuery.docs[0];
};


export const timeIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { employeeId } = req.body;
        if (!employeeId) {
            return res.status(400).json({ message: 'employeeId is required.' });
        }
        
        // TODO: Implement Time-In logic.
        // 1. Find the employee's document using the helper function `findEmployeeByCustomId`.
        // 2. If employee not found, return 404.
        // 3. Create a new attendance record in the 'attendance' subcollection of that employee.
        //    - type: 'time-in'
        //    - timestamp: firestore.Timestamp.now()
        //    - location: 'BGC, Taguig City Office'
        // 4. Return a success message with a 201 status.
        res.status(501).json({ message: 'Not Implemented' });

    } catch (error) {
        next(error);
    }
};

export const timeOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { employeeId } = req.body;
         if (!employeeId) {
            return res.status(400).json({ message: 'employeeId is required.' });
        }
        
        // TODO: Implement Time-Out logic.
        // (Similar to timeIn, but the type is 'time-out')
        res.status(501).json({ message: 'Not Implemented' });

    } catch (error) {
        next(error);
    }
};

export const getAttendanceRecords = async (req: Request, res: Response, next: NextFunction) => {
     try {
        const { employeeId } = req.params;
        
        // TODO: Implement logic to get all attendance records for an employee.
        // 1. Find the employee's document using their custom employeeId.
        // 2. If not found, return 404.
        // 3. Query the 'attendance' subcollection and order by timestamp.
        // 4. Return the list of records with a 200 status.
        res.status(501).json({ message: 'Not Implemented' });

    } catch (error) {
        next(error);
    }
};
