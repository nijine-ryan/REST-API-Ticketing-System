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
            res.status(404)
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
                .status(400)
                .json({
                    success: false,
                    msg: "Person Id is not valid"
                })
            return res
                .status(200)
                .json({
                    success: true,
                    msg: "user data retrived",
                    person
                })
        }).catch(err => {
            console.log(err);
        })

}


// getTickets give response with all assigned tickets
function getTickets(req, res) {
    readData('tickets.json')
        .then(tickets => {
            res.status(200)
                .json(tickets)
        }).catch(err => {
            res.status(400)
                .json(err)
        })

}


// assignTicket function used to assign the ticket to the person
function assignTicket(req, res) {
    const { userId, issu_dis } = req.body;
    if (!userId) {
        return res
            .status(400)
            .json({
                success: false,
                msg: "Please provide valid credentials"
            })
    } else {
        swap(true);
        assign(userId, issu_dis)
            .then(data => {
                console.log(data)
                res.status(201)
                    .json(data)
            }).catch(err => {
                res.status(400)
                    .json(err)
            })
    }
}

function returnToDefault(req, res) {
    restartServer()
        .then((msg) => {
            res.status(200)
                .json(msg)
        }).catch(err => {
            res.status(500)
                .json(err)
        })
}


module.exports = {
    getPeople,
    getPerson,
    assignTicket,
    getTickets,
    returnToDefault

}
