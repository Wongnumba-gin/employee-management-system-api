//employeeController.js - Manages all employee records: hiring, viewing, updating, and soft deletion.
const { getDb } = require('../config/firebase'); 
const express = require('express'); 
//Connect to the Firebase database and get Express utilities

//--- Helper Function ---
//Creates a unique employee ID using the current time
const generateEmployeeId = () => {
    return `EMP-${Date.now()}`; 
    //Generates a tag like 'EMP-1678888888888' for easy identification
};


//1. CREATE (Hire New Employee)
const createEmployee = async (req, res, next) => {
    try {
        const db = getDb();
        const { firstName, lastName, email, positionId, departmentId, hireDate } = req.body;

        //Check: Make sure all required fields were sent in the request
        if (!firstName || !lastName || !email || !positionId || !departmentId) {
            return res.status(400).json({ message: 'All required fields must be provided to hire an employee.' });
        }
        
        //Critical Check: (doenst allow hiring the same person with the same email)
        const existingEmployee = await db.collection('employees')
            .where('email', '==', email.toLowerCase().trim())
            .where('isActive', '==', true) 
            .get(); 
            //Only look at employees who are currently active

        if (!existingEmployee.empty) {
            return res.status(409).json({ message: 'An active employee with this email already exists.' });
        }

        const newEmployee = {
            employeeId: generateEmployeeId(), //Assign the unique ID tag
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            positionId: positionId.trim(),
            departmentId: departmentId.trim(),
            hireDate: hireDate ? new Date(hireDate) : new Date(),
            isActive: true, //Default status is 'active' (but not deleted)
            createdAt: new Date(),
        };

        //Saves the new employee record to the database
        const docRef = await db.collection('employees').add(newEmployee);
        const doc = await docRef.get();

        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Trouble creating employee record:", error);
        next(error);
    }
};

//2. READ ALL (View Full Employee List)
const getAllEmployees = async (req, res, next) => {
    try {
        const db = getDb();
        //gets every document in the 'employees' collection
        const snapshot = await db.collection('employees').get(); 

        //Maps the results into a clean list, including the document's unique Firestore ID
        const employees = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        //Sends the entire employee roster
        res.status(200).json(employees);
    } catch (error) {
        console.error("Trouble fetching the full employee list:", error);
        next(error);
    }
};

//3. READ BY ID (only Views Single Employee Details)
const getEmployeeById = async (req, res, next) => {
    try {
        const db = getDb();
        //Get the Firestore Document ID from the URL parameter
        const { id } = req.params;

        //Look up the specific employee document
        const doc = await db.collection('employees').doc(id).get();

        //If the document doesn't exist, tell the user it wasn't found
        if (!doc.exists) {
            return res.status(404).json({ message: `Employee with ID ${id} not found.` });
        }

        //Send the employee's details
        res.status(200).json({ 
            id: doc.id, 
            ...doc.data() 
        });
    } catch (error) {
        console.error("Trouble fetching specific employee details:", error);
        next(error);
    }
};

//4. UPDATE (Modify Employee Record)
const updateEmployee = async (req, res, next) => {
    try {
        const db = getDb();
        //Gets the Firestore Document ID from the URL parameter
        const { id } = req.params;
        const { firstName, lastName, email, positionId, departmentId, hireDate, isActive } = req.body;
        
        //Builds an object with fields that is provided for the update
        const updateData = {};
        if (firstName) updateData.firstName = firstName.trim();
        if (lastName) updateData.lastName = lastName.trim();
        if (positionId) updateData.positionId = positionId.trim();
        if (departmentId) updateData.departmentId = departmentId.trim();
        if (email) updateData.email = email.toLowerCase().trim();
        if (hireDate) updateData.hireDate = new Date(hireDate);
        if (typeof isActive === 'boolean') updateData.isActive = isActive;

        if (Object.keys(updateData).length === 0) {
             return res.status(400).json({ message: 'Please provide at least one valid field to update.' });
        }

        //Get a reference and check if the employee exists before updating
        const docRef = db.collection('employees').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: `Employee with ID ${id} not found.` });
        }
        
        //Apply the changes to the employee document
        await docRef.update(updateData);

        //Fetch the document again for final updated version
        const updatedDoc = await docRef.get();

        res.status(200).json({ 
            id: updatedDoc.id, 
            ...updatedDoc.data() 
        });

    } catch (error) {
        console.error("Trouble updating employee record:", error);
        next(error);
    }
};

//5. DELETE (Remove Employee - Soft Delete)
const deleteEmployee = async (req, res, next) => {
    try {
        const db = getDb();
        //Get the Firestore Document ID from the URL
        const { id } = req.params;

        //Get a reference and verify the employee exists
        const docRef = db.collection('employees').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: `Employee with ID ${id} not found.` });
        }
        
        //Critical Step (marks the employee as inactive instead of deleting data)
        await docRef.update({ 
            isActive: false 
        });

        //Respond with "No Content" (204) to signify a successful delete operation
        res.status(204).send();

    } catch (error) {
        console.error("Trouble setting employee as inactive (soft delete):", error);
        next(error);
    }
};


//Makes all our management functions available to the Express router
module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
};