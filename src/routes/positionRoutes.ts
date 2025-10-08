//positionRoutes.js - Defines the URLs for managing all Job Position records.

//Set up the router and load the controller functions
const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController'); 

//--- Position Endpoints (The URLs) ---

//Handles creating a new job position (POST /api/positions)
router.post('/', positionController.createPosition);

//Handles viewing all job positions (GET /api/positions)
router.get('/', positionController.getAllPositions);

//Handles viewing a specific position by its ID (GET /api/positions/:id)
router.get('/:id', positionController.getPositionById); 

//Handles updating a specific position by its ID (PUT /api/positions/:id)
router.put('/:id', positionController.updatePosition); 

//Handles deleting a specific position by its ID (DELETE /api/positions/:id)
router.delete('/:id', positionController.deletePosition); 

//Make these routes available to the main application
module.exports = router;