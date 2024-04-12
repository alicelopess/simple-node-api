import http from 'node:http' //ES Modules
import { randomUUID } from 'node:crypto' //Unique ID for each user
import { reqValidator } from './middlewares/req-validator.js'
import { Database } from './database/database.js'

//Database
const database = new Database()

//Create Native Server
const server = http.createServer(async (request, response) => {
    //TODO: Get Request Method & URL
    const {method, url} = request //destructuring

    //Request body collection middleware
    await reqValidator(request)

    //TODO: Create Users CRUD Routes

    if(method == 'POST' && url == '/users') {
        //TODO: Get Request Body
        const {name, email} = request.body

        //TODO: Create user
        const user = {
            id: randomUUID(),
            name,
            email,
        }

        //TODO: Insert user into DB
        database.insert('users', user)

        return response
            .writeHead(201) //Status Code
            .end('Create User')
    }

    if(method == 'GET' && url == '/users') {
        //TODO: Get users table
        const users = database.select('users')

        return response
            .setHeader('Content-type', 'application/json') //Response data type 
            .end(JSON.stringify(users)) //Must be of type string
    }

    return response
        .writeHead(404) //Route | Resource Not Found
        .end()
})

server.listen(3333) //Server port
