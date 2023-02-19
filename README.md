# REST-API-Ticketing-System
Backend Web Development Assessment

------------------------------
      PROJECT ANATOMY   
------------------------------

DEPENDENCIES INSTALLED VIA NPM 
_____________________________

 1.express
 2.shortid
 
 DEVDEPENDENCIES
 ____________________________
 
 1.morgan
 
LOCAL DATA 
_____________________________

( Ticketing System > localData )


File Name                             File Path                                                                    Description   
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 
people.json              ------       Ticketing System > localData > people.json                  ------  people.json file used to store the static data of 5 person.


tickets.json             ------       Ticketing System > localData > tickets.json                 ------  tickets.json file used to store the raised tickets 
                                                                                                          after it get assigned to a person     

roundRobinKey.json       ------       Ticketing System > localData > .roundRobinKey.json          ------  roundRobinKey.json file is used to
                                                                                                          store a number which hold the 
                                                                                                          round-robin principle between server restarts.



APPLICATION ROUTES
_____________________________

(Ticketing System > router > routes.js) 

1. POST ROUTES

   1.1 router.route('/ticket').post(assignTicket)
   
2.GET ROUTES

  2.1 router.route('/people').get(getPeople),
  2.2 router.route('/people/:personId').get(getPerson),
  2.3 router.route('/tickets').get(getTickets)

3.PUT ROUTES

  3.1 router.route('/restart').put(returnToDefault)

CONTROLLERS
______________________________

(Ticketing System > controllers > commonController.js)
      
      Controllers Function                                     Route                                                                       Description 
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    assignTicket         ------                 router.route('/ticket').post(assignTicket)                 ------         * Assign the raised ticket to a person in terms of round-robin principle 
                                                                                                                          *  Store the ticket in the ticket.json        (Ticketing System > localData > tickets.json)   file, with person id which the ticket get  assigned
                                                                                                            
    getPeople            ------                  router.route('/people').get(getPeople)                     ------         * getPeople function retrieve people data 
                                                                                                                           from people.json(Ticketing System > localData > people.json)
             
             
    getPerson            ------                   router.route('/people/:personId').get(getPerson)           ------        * getPerson retrieve a person which matches 
                                                                                                                            the give personId( const {personId} = req.params ;
          
          
    getTickets           ------                  router.route('/tickets').get(getTickets)                    ------        * getTickets retrieve all the raised tickets 
                                                                                                                             from ticket.json (Ticketing System > localData > tickets.json)  file.
    
    
    returnToDefault      ------   router.route('/restart').put(returnToDefault)                               ------       * returnToDefault reset the  people.json, 
                                                                                                                            tickets.json, roundRobinKey.json to their default values 
HELPER FUNCTIONS 
______________________________

 (Ticketing System > Helper > commonHelper.js)
 
    assign(userId, issu_dis)  - Helps to assign the tickets.
    
    swap(bool)                - Makes the for loop run one time.
    
    getItem(id,data)          - Find the matched id from the give data.
    
    readData(fileName)        - Used to read the localData files.
    
    writeData(fileName, data) - OverWrite the given file with the provided data . 
    
    restartServer             - Used to reset the local datas to default data.



--------------------------------------------------------------------------------------------------------------------- 
BEFORE START THE APPLICATION MAKE SURE THAT YOU HAD ALL PACKAGES FROM NPM(take a glance at package.json)
---------------------------------------------------------------------------------------------------------------------
