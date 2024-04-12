import http from 'node:http' //ES Modules

//Create temporary DB
const users = []

//Create Native Server
const server = http.createServer((request, response) => {
    //TODO: Get Request Method & URL
    const {method, url} = request //destructuring

    //TODO: Create Users CRUD Routes

    if(method == 'POST' && url == '/users') {
        users.push({
            id: 1,
            name: 'Alice Dantas',
            email: 'alice@email.com'
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
        .writeHead(404) //Not Found
        .end()
})

server.listen(3333) //Server port
