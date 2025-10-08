//attendanceController.js - Manages employee clock-in/out and attendance history.

//Get the database connection and the special Firestore timestamp function
const { getDb } = require('../config/firebase');
const { firestore } = require('firebase-admin'); 

//--- Helper Functions ---

//Finds an employee using their unique 'EMP-XXX' ID.
const findEmployeeByCustomId = async (employeeId) => {
    const db = getDb();
    const employeeQuery = await db.collection('employees').where('employeeId', '==', employeeId).limit(1).get();
    //Search the 'employees' collection for a match on the custom employeeId

    if (employeeQuery.empty) {
        return null;
    }
    
    return employeeQuery.docs[0];
    //Return the document found
};

const recordTimeEvent = async (req, res, next, type) => {
    //Handles the core logic for logging a time event (time-in or time-out).
    try {
        const db = getDb();
        const { employeeId } = req.body;
        
        if (!employeeId) {
            return res.status(400).json({ message: 'employeeId is required in the request body.' });
            //Checking to ensure the employee ID was sent in the request
        }
        
        //Find the employee in the database
        const employeeDoc = await findEmployeeByCustomId(employeeId);
        
        //If the employee isn't found, stop and send an error
        if (!employeeDoc) {
            return res.status(404).json({ message: `Employee with ID ${employeeId} not found.` });
        }
        
        //Get a pointer to the employee's document
        const employeeRef = employeeDoc.ref;

        //New attendance log entry
        const attendanceRecord = {
            type: type, //'time-in' or 'time-out'
            timestamp: firestore.Timestamp.now(), //using the official server time 
            location: 'BGC, Taguig City Office',
        };

        
        //Add the record to the employee's dedicated 'attendance' subcollection
        await employeeRef.collection('attendance').add(attendanceRecord);

        res.status(201).json({ 
            message: `Employee ${employeeId} successfully recorded ${type}.`,
            record: attendanceRecord 
        });

    } catch (error) {
        //Log the error and let Express handle it
        console.error(`Error recording ${type} for employee:`, error);
        next(error);
    }
};


//--- Endpoint Handlers ---

//Handles employee clock-in
const timeIn = (req, res, next) => {
    return recordTimeEvent(req, res, next, 'time-in');
};

//Handles employee clock-out
const timeOut = (req, res, next) => {
    return recordTimeEvent(req, res, next, 'time-out');
};


//Retrieves the complete attendance history for a single employee
const getAttendanceRecords = async (req, res, next) => {
    try {
        const db = getDb();
        //Gets the custom employee ID from the URL path
        const { employeeId } = req.params;

        //Find the employee in the database
        const employeeDoc = await findEmployeeByCustomId(employeeId);

        //If the employee is missing, send an error
        if (!employeeDoc) {
            return res.status(404).json({ message: `Employee with ID ${employeeId} not found.` });
        }
        
        //gets all records from the 'attendance' subcollection, sorted chronologically
        const snapshot = await employeeDoc.ref.collection('attendance').orderBy('timestamp', 'asc').get();

        //Format the database records for the API response
        const records = snapshot.docs.map(doc => ({
            id: doc.id, // Include the attendance record's unique ID
            ...doc.data(),
        }));

        //Send the full history log
        res.status(200).json(records);

    } catch (error) {
        console.error("Error fetching attendance records:", error);
        next(error);
    }
};

//Make all our attendance functions available to the Express router
module.exports = {
    timeIn,
    timeOut,
    getAttendanceRecords,
};