const express = require('express');
const actionRouter = require('./actions/actions-router');


const server = express();

server.use(express.json());
server.use('/api/actions', actionRouter);
// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.get('*', (req,res) => {
    res.send(`<h2>Singin, don't worry.. Bout a thing. Cause every little thing, gonna be alright!</h2>`)
})
module.exports = server;
