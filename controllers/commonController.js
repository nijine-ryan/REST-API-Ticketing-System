const {
    assign,
    swap,
    getItem,
    readData,
    restartServer
} = require('../Helper/commonHelper');

// getPeople function used to get people form local sample data
function getPeople(req, res) {
    readData('people.json')
        .then(people => {
            res.status(200)
                .json(people)
        }).catch(err => {
            res.status(501)
                .json(err)
        })

}

// Controller for get the specific person 
function getPerson(req, res) {
    const { personId } = req.params;
    readData('people.json')
        .then(people => {
            const person = getItem(personId, people);
            if (!person) return res
                .status(501)
                .json({
                    success: false,
                    msg: "Person Id is not valid"
                })
            return res
                .status(201)
                .json({
                    success: true,
                    msg: "user data retrived",
                    person
                })
        }).catch(err => {
            console.log(err);
        })

}

// getPersonTicket used to get the tickets assigned to a specfic person
function getPersonTicket(req, res) {
    const { personId } = req.params;
    // const isValid = validatePersonId(personId);
    readData('people.json')
        .then(people => {
            const person = getItem(personId, people);
            if (!person) return res.json({
                success: false,
                msg: "Person Id is not valid"
            })
            res.status(201)
                .json(
                    {
                        id: personId,
                        name: person.name,
                        tickets: person.tickets
                    })
        }).catch(err => {
            console.log(err)
        })


}
// getTickets give response with all assigned tickets
function getTickets(req, res) {
    readData('tickets.json')
        .then(tickets => {
            res.status(201)
                .json(tickets)
        }).catch(err => {
            res.status(500)
                .json(err)
        })

}
// controller for get a specific the assigned tickets
function getTicket(req, res) {
    const { ticketId } = req.params;
    readData('tickets.json')
        .then(tickets => {
            const ticket = getItem(ticketId, tickets);
            if (!ticket) return res
                .status(501)
                .json({
                    success: false,
                    msg: "Ticket id is not valid"
                })
            res.status(201)
                .json(tickets)
        }).catch(err => {
            res.status(500)
                .json(err)
        })
}

// assignTicket function used to assign the ticket to the person
function assignTicket(req, res) {
    const { id, raisedUserId, issu_dis } = req.body;
    if (!id && !raisedUserId) {
        return res
            .status(500)
            .json({
                success: false,
                msg: "Please provide valid credentials"
            })
    } else {
        swap(true);
        assign(id, raisedUserId, issu_dis)
            .then(data => {
                console.log(data)
                res.status(201)
                    .json(data)
            }).catch(err => {
                res.status(501)
                    .json(err)
            })
    }
}

function returnToDefault(req, res) {
    restartServer()
        .then((msg) => {
            res.status(201)
                .json(msg)
        }).catch(err => {
            res.status(501)
                .json(err)
        })
}


module.exports = {
    getPeople,
    getPerson,
    getPersonTicket,
    assignTicket,
    getTickets,
    getTicket,
    returnToDefault

}
