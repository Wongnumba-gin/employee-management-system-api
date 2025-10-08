//departmentController.js - Contains all functions to manage the Department data (Create, Read, Update, Delete).

//Grab the database connection and the Express utilities we need
const { getDb } = require('../config/firebase'); 
const express = require('express'); 

//--- Department Management Functions ---

//1. Creates a brand new department
const createDepartment = async (req, res, next) => {
	try {
		const db = getDb();
		const { name } = req.body;
		
		//Make sure a valid name was actually sent---- quick check
		if (!name || typeof name !== 'string' || name.trim() === '') {
			return res.status(400).json({ message: 'A department name is required.' });
		}

		//Prepare the new department object
		const newDepartment = {
			name: name.trim(),
			createdAt: new Date(),
		};

		//Save the new department to the Firestore collection
		const docRef = await db.collection('departments').add(newDepartment);
		const doc = await docRef.get();

		//Send back the new department details
		res.status(201).json({ id: doc.id, ...doc.data() });
	} catch (error) {
		console.error("Trouble creating department:", error);
		next(error);
	}
};

//2. Fetches and lists all departments
const getDepartments = async (req, res, next) => {
	try {
		const db = getDb();
		//Get all documents from the 'departments' collection
		const snapshot = await db.collection('departments').get();

		//Transforms the results into a clean list, ensuring the document ID is included
		const departments = snapshot.docs.map(doc => ({
			id: doc.id,
			...doc.data(),
		}));

		res.status(200).json(departments);
	} catch (error) {
		console.error("Trouble fetching all departments:", error);
		next(error);
	}
};

//3. Fetches a single department by its unique ID
const getDepartmentById = async (req, res, next) => {
	try {
		const db = getDb();
		const { id } = req.params;

		//Tries to find the specific department document
		const doc = await db.collection('departments').doc(id).get();

		//If the document doesn't exist, tell the client it's not found
		if (!doc.exists) {
			return res.status(404).json({ message: `Department with ID ${id} not found.` });
		}


		res.status(200).json({ 
			id: doc.id, 
			...doc.data() 
		});
	} catch (error) {
		console.error("Trouble fetching department by ID:", error);
		next(error);
	}
};

//4. Updates an existing department's name
const updateDepartment = async (req, res, next) => {
	try {
		const db = getDb();
		const { id } = req.params;
		const { name } = req.body;

		//Check: The update request must include a valid name
		if (!name || typeof name !== 'string' || name.trim() === '') {
			return res.status(400).json({ message: 'A department name is required for update.' });
		}

		//Get a reference and check if the department exists before updating
		const docRef = db.collection('departments').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			return res.status(404).json({ message: `Department with ID ${id} not found.` });
		}

		//Apply the update to the document
		await docRef.update({ 
			name: name.trim() 
		});

		//Retrieve the document again to show the client the updated data
		const updatedDoc = await docRef.get();

		res.status(200).json({ 
			id: updatedDoc.id, 
			...updatedDoc.data() 
		});

	} catch (error) {
		console.error("Trouble updating department:", error);
		next(error);
	}
};


//5. Deletes a department permanently
const deleteDepartment = async (req, res, next) => {
	try {
		const db = getDb();
		const { id } = req.params;

		//Get a reference and check if the document exists before deleting
		const docRef = db.collection('departments').doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			return res.status(404).json({ message: `Department with ID ${id} not found.` });
		}
		
		//Remove the document from the database
		await docRef.delete();

		//Successful deletion is reported with a 204 status (no body content needed)
		res.status(204).send();

	} catch (error) {
		console.error("Trouble deleting department:", error);
		next(error);
	}
};


//Make all our functions available to the Express router
module.exports = {
	createDepartment,
	getDepartments,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};