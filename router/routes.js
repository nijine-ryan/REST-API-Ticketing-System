const express = require('express');
const router = express.Router();

const { getPeople, getPerson, assignTicket, getTickets, returnToDefault } = require('../controllers/commonController')


// GET methods 
router.route('/people').get(getPeople)
router.route('/people/:personId').get(getPerson)
router.route('/tickets').get(getTickets)

// POST methods for assign the tickets
router.route('/ticket').post(assignTicket)

//PUT method for reset the server
router.route('/restart').put(returnToDefault)
module.exports = router;