import http from 'node:http' //ES Modules

//Create Native Server
const server = http.createServer((request, response) => {
    return response.end('Hello World!') //Create HTML Page
})

server.listen(3333) //Server port
