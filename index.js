const express = require('express');
const req = require('request');
const fs = require('fs-extra');
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
    //getRequest(request, response);
    getMultipartFormData(request, response);
});

const getMultipartFormData = ( request, response ) => {
    const formData = {
        // Pass a simple key-value pair
        my_field: 'my_value',
        // Pass data via Buffers
        my_buffer: Buffer.from([1, 2, 3]),
        // Pass data via Streams
        my_file: fs.createReadStream(__dirname + '/attachment.pdf'),
        // Pass multiple values /w an Array
        attachments: [
            fs.createReadStream(__dirname + '/attachment.pdf'),
            fs.createReadStream(__dirname + '/attachment.pdf')
        ]
    };
    req.post(
        {
            url: 'http://locahost:3000',
            "Content-Type": "multipart/form-data",
            formData: formData
        },(err, result) => {
            if (err) {
                console.log("Error occured: ", err);
                response.send({Error: err});
            } else{
                response.send({ result : res });
            }
        }
    )
};

const getRequest = ( request, response ) => {
    req.get('https://static.h-bid.com/gdpr/cmp.stub.js', (err, res) => {
       if (err) {
           console.log("Error occured: ", err);
           response.send({Error: err});
       } else{
           response.send({ result : res });
       }
    });
};

app.listen(3000);
console.log("server is listening on 3000");