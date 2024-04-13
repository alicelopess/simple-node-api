import { randomUUID } from 'node:crypto' //Unique ID for each user
import { Database } from '../database/database.js'
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

//routes
export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (request, response) => {
            const { search } = req.query //Identifies search

            //TODO: Get users table
            const users = database.select('users', search ? {
                name: search,
                email: search,
            } : null)

            return response
                .setHeader('Content-type', 'application/json') //Response data type 
                .end(JSON.stringify(users)) //Must be of type string
    
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
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
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params

            database.remove('users', id)

            return response
                .writeHead(204) //Status Code
                .end('Delete User')
    
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (request, response) => {
            const { id } = request.params
            const { name, email } = request.body

            database.update('users', id, {
                name,
                email
            })

            return response
                .writeHead(204) //Status Code
                .end('Update User')
    
        }
    },
]