const express = require('express');
const req = require('request');
const app = express();

app.use((request, response, next) => {
    console.log(request.headers);
    next()
});

app.use((request, response, next) => {
    request.chance = Math.random();
    next();
});

app.get('/', (request, response) => {
    getRequest(request, response);
});

const getRequest = ( request, response ) => {
    req.get('https://static.h-bid.com/gdpr/cmp.stub.js', (err, res) => {
       if (err)  response.send({status : "200 OK"});
       response.send({
           result : res
       });
    });
};

app.listen(3000);
console.log("server is listening on 3000");