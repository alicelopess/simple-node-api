import http from 'node:http' //ES Modules

//Create Native Server
const server = http.createServer((request, response) => {
    //TODO: Get Request Method & URL
    const {method, url} = request //destructuring

    //TODO: Create Users CRUD Routes

    if(method == 'POST' && url == '/users') {
        //early return
        return response.end('Create Users')
    }

    if(method == 'GET' && url == '/users') {
        return response.end('Read Users')
    }

    return response.end('Hello World!') //Create HTML Page
})

server.listen(3333) //Server port
