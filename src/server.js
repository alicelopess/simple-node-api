import http from 'node:http' //ES Modules
import { randomUUID } from 'node:crypto' //Unique ID for each user

//Create temporary DB
const users = []

//Create Native Server
const server = http.createServer(async (request, response) => {
    //TODO: Get Request Method & URL
    const {method, url} = request //destructuring
    
    //Streams
    //request => readable stream
    //response => writable stream

    //TODO: Create buffer array to collect all chunks from request
    const buffers = [] 

    // await reading - receiving the request body
    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString()) //Transforms the array of buffers into a string and then into a JSON object
        console.log(request.body)
    } catch {
        request.body = null
    }


    //TODO: Create Users CRUD Routes

    if(method == 'POST' && url == '/users') {
        //TODO: Get Request Body

        const {name, email} = request.body

        users.push({
            id: randomUUID(),
            name,
            email,
        })

        return response
            .writeHead(201) //Status Code
            .end('Create User')
    }

    if(method == 'GET' && url == '/users') {
        return response
            .setHeader('Content-type', 'application/json') //Response data type 
            .end(JSON.stringify(users)) //Must be of type string
    }

    return response
        .writeHead(404) //Route | Resource Not Found
        .end()
})

server.listen(3333) //Server port
