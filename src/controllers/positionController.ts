//positionController.js - Manages all job titles and their association with departments (Create, Read, Update, Delete).
const { getDb } = require('../config/firebase'); 
const express = require('express'); 
//Connect to the Firebase database and get Express utilities

// --- Position Management Functions (CRUD) ---

//1. CREATE (Create a New Job Position)
const createPosition = async (req, res, next) => {
    try {
        const db = getDb();
        const { title, departmentId } = req.body;
        
        //Check they must have a valid title
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ message: 'A position title is required.' });
        }
        //Check must be linked to a valid department
        if (!departmentId || typeof departmentId !== 'string' || departmentId.trim() === '') {
            return res.status(400).json({ message: 'A department ID is required to create a position.' });
        }

        //Prepare the new position record
        const newPosition = {
            title: title.trim(),
            departmentId: departmentId.trim(),
            createdAt: new Date(),
        };

        //Save the new position to the 'positions' collection
        const docRef = await db.collection('positions').add(newPosition);
        const doc = await docRef.get();

        res.status(201).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error("Trouble creating position:", error);
        next(error);
    }
};

//2. READ ALL (Views All Job Positions)
const getAllPositions = async (req, res, next) => {
    try {
        const db = getDb();
        //gets every position document from the collection
        const snapshot = await db.collection('positions').get();

        //Format the results into a clean list, including the unique Firestore ID
        const positions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        res.status(200).json(positions);
    } catch (error) {
        console.error("Trouble fetching all positions:", error);
        next(error);
    }
};

//3. READ BY ID (View Single Position Detail)
const getPositionById = async (req, res, next) => {
    try {
        const db = getDb();
        //Get the unique Firestore ID from the URL path
        const { id } = req.params;

        //Try to find the specific position document
        const doc = await db.collection('positions').doc(id).get();

        //If the document doesn't exist, sends a Not Found error
        if (!doc.exists) {
            return res.status(404).json({ message: `Position with ID ${id} not found.` });
        }

        res.status(200).json({ 
            id: doc.id, 
            ...doc.data() 
        });
    } catch (error) {
        console.error("Trouble fetching position by ID:", error);
        next(error);
    }
};

//4. UPDATE (Modify Existing Position)
const updatePosition = async (req, res, next) => {
    try {
        const db = getDb();
        //Get the position's ID from the URL
        const { id } = req.params;
        const { title, departmentId } = req.body;

        //Check at least one field must be provided to update the document
        if (!title && !departmentId) {
            return res.status(400).json({ message: 'You must provide a title or departmentId to update the position.' });
        }
        
        //Build an object containing only the valid fields we received
        const updateData = {};
        if (title && typeof title === 'string' && title.trim() !== '') {
            updateData.title = title.trim();
        }
        if (departmentId && typeof departmentId === 'string' && departmentId.trim() !== '') {
            updateData.departmentId = departmentId.trim();
        }
        
        //Get a reference and check if the position exists before trying to modify it
        const docRef = db.collection('positions').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: `Position with ID ${id} not found.` });
        }

        //Apply the changes to the database
        await docRef.update(updateData);

        //gets the updated document to send the current state back
        const updatedDoc = await docRef.get();

        //Send the final updated details
        res.status(200).json({ 
            id: updatedDoc.id, 
            ...updatedDoc.data() 
        });

    } catch (error) {
        console.error("Trouble updating position:", error);
        next(error);
    }
};

//5. DELETE (Remove Position Permanently)
const deletePosition = async (req, res, next) => {
    try {
        const db = getDb();
        //Get the position's ID from the URL
        const { id } = req.params;

        //Get a reference and verify the position exists
        const docRef = db.collection('positions').doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: `Position with ID ${id} not found.` });
        }
        
        //Permanently delete the document from Firestore
        await docRef.delete();
        
        //Respond with a 204 (No Content) status
        res.status(204).send();

    } catch (error) {
        console.error("Trouble deleting position:", error);
        next(error);
    }
};


//Export all controller functions so the router can use them
module.exports = {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
};