import http from 'node:http' //ES Modules
import { reqValidator } from './middlewares/req-validator.js'
import { routes } from './middlewares/routes.js'
import { Database } from './database/database.js'

//Database
const database = new Database()

//Create Native Server
const server = http.createServer(async (request, response) => {
    //TODO: Get Request Method & URL
    const {method, url} = request //destructuring

    //Request body collection middleware
    await reqValidator(request)

    //TODO: Validate routes
    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if (route) { //if exists
        route.handler(request, response)
    } else {
        return response
        .writeHead(404) //Route | Resource Not Found
        .end()
    }
})

server.listen(3333) //Server port
