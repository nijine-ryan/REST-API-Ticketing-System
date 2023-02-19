const fs = require('fs');
const { peopleDefault, ticketDefault, defaultKey } = require('../defaultData');

async function readData(fileName) {
    return new Promise((res, rej) => {
        fs.readFile(`./localData/${fileName}`, 'utf-8', (err, dataJson) => {
            if (err) {
                return rej(err);
            } else {
                res(JSON.parse(dataJson))
            }
        })

    })
}


async function writeData(fileName, data) {
    const jsonData = JSON.stringify(data, null, 2);
    return new Promise((res, rej) => {
        fs.writeFile(`./localData/${fileName}`, jsonData, (err) => {
            if (err) {
                return rej(err);
            } else {
                res()
            }
        })

    })
}



// This value is make the loop(inside the assign function)
//  runs one time 
let start = true;
//swap function
function swap(value) {
    start = value;
}


// assign function assign the ticket to a person in terms of
// round-robin principl
async function assign(ticketId, raisedUserId, issu_dis) {
    return new Promise((res, rej) => {
        readData('people.json')
            .then(people => {
                const maxIteration = people.length - 1;
                readData('roundRobinKey.json')
                    .then(key => {
                        // round robin principle implement start here
                        for (let i = key; start;) {
                            // swap the start variable to false and stop the loop
                            swap(false)
                            const peopleToBeUpdated = people;
                            peopleToBeUpdated[i].tickets.push(ticketId);
                            writeData('people.json', peopleToBeUpdated)
                                .then(() => res())
                                .catch(err => rej(err))

                            const personId = people[i].id;
                            storeTicket(ticketId, personId, raisedUserId, issu_dis)
                                .then((res) => res(res))
                                .catch(err => rej(err))
                            let keyToBeUpdate = key + 1;
                            if (key >= Number(maxIteration)) {
                                keyToBeUpdate = 0;
                            }
                            writeData('roundRobinKey.json', keyToBeUpdate)
                                .then(() => res())
                                .catch(err => rej(err))
                        }
                        res({
                            successful: true,
                            msg: 'Ticket assigned successfully'
                        })
                    })
            }).catch(err => {
                rej(err)
            })
    })

}

// storeTicket function store the tickets after they get 
// assigned to a person
async function storeTicket(ticketId, assignedUserId, raisedUserId, issu_dis) {

    return new Promise((res, rej) => {
        const raisedTicket = {
            id: ticketId,
            issu_dis,
            assignedUserId,
            raisedUserId
        }
        readData("tickets.json")
            .then(tickets => {
                const dataToBeWrite = tickets;
                dataToBeWrite.push(raisedTicket);
                writeData('tickets.json', dataToBeWrite)
                    .then(() => res({
                        successful: true,
                        msg: "Ticket stored successfully"
                    }))
                    .catch(err => rej(err));
                return res({
                    successful: true,
                    msg: "Tickets file read successfully"
                })

            }).catch(err => {
                rej(err);
            })
    })



}

// getItem function return the matched item with the given id 
// in the give data
function getItem(id, data) {
    const item = data.find(item => Number(item.id) === Number(id))
    return item;
}

async function restartServer() {
    return new Promise((res, rej) => {
        writeData('people.json', peopleDefault)
            .then(() => {
                writeData('tickets.json', ticketDefault)
                    .then(() => {
                        writeData('roundRobinKey.json', defaultKey)
                            .then(() => res())
                            .catch((err) => rej(err))
                        res()
                    }).catch((err) => rej(err))
                return res({
                    successful: true,
                    msg: "Server  reset successfully"
                })
            }).catch((err) => rej(err))


    })
}


module.exports = {
    assign,
    swap,
    getItem,
    readData,
    restartServer
}