const express = require('express');
const router = express.Router();

const { getPeople, getPerson, getPersonTicket, assignTicket, getTickets, getTicket, returnToDefault } = require('../controllers/commonController')


// GET methods 
router.route('/people').get(getPeople)
router.route('/people/:personId').get(getPerson);
router.route('/people/:personId/tickets').get(getPersonTicket)
router.route('/tickets').get(getTickets)
router.route('/tickets/:ticketId').get(getTicket)



// POST methods for assign the tickets
router.route('/assignTicket').post(assignTicket)
router.route('/restart').put(returnToDefault)
module.exports = router;