//index.js - The main entry point EMS API.

//Load necessary modules and configurations
const express = require('express');
const dotenv = require('dotenv'); //Used to load environment variables from the .env file
const { initFirebase } = require('./config/firebase'); //Firebase setup utility
//Load all the specific route files
const departmentRoutes = require('./routes/departmentRoutes'); 
const positionRoutes = require('./routes/positionRoutes'); 
const employeeRoutes = require('./routes/employeeRoutes'); 
const attendanceRoutes = require('./routes/attendanceRoutes');

//Load variables from the .env file into process.env
dotenv.config();
const app = express();
//Set the server port, defaulting to 8080 if not specified in .env
const port = process.env.PORT || 8080;

//Middleware setup: Allows the app to read JSON data sent in request bodies
app.use(express.json()); 

//--- CRITICAL: FIREBASE DATABASE CONNECTION ---

//1. Verify that the required secret key is present in the environment variables
if (!process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
	// If the key is missing, halt the application immediately
	throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 not set in .env');
}

//2. Take the secure Base64 key and decode it back into a readable JSON object
const serviceAccount = JSON.parse(
	Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
);

//3. Use the decoded key to initialize and connect to the Firebase database
initFirebase(serviceAccount);

//--- END FIREBASE INITIALIZATION ---

//route to quickly confirm the server is awake and running
app.get('/', (req, res) => {
	res.send('🚀 Employee Management System API is running!');
});

//Connect the application logic (controllers) to their respective base URLs (routes)
app.use('/api/departments', departmentRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes); 

//Start the server and listen for incoming requests on the configured port
app.listen(port, () => {
	console.log(`✅ Server is running on http://localhost:${port}`);
});