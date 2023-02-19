const express = require('express');
const app = express();
const morgan = require('morgan');
const { json } = require('express')
const router = require('./router/routes');

// All incomming requests will handel by the router
app.use(morgan('tiny'));
app.use(json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.json({
        successful: true,
        msg: "user hit the server"
    })
})

// Server running port
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
})