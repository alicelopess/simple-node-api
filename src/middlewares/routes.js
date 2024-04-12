import { randomUUID } from 'node:crypto' //Unique ID for each user
import { Database } from '../database/database.js'

const database = new Database()

//routes
export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (request, response) => {
            //TODO: Get users table
            const users = database.select('users')

            return response
                .setHeader('Content-type', 'application/json') //Response data type 
                .end(JSON.stringify(users)) //Must be of type string
    
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, response) => {
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
    },
]