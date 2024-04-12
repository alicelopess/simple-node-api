export async function reqValidator(request) {
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
}