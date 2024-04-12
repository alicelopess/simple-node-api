//Creating a database based on files
// --Model: { "users": [{user}, ...] }
// --Command: database[table] => [{user}, ...]

export class Database {
    #database = {} //private propertie -  cannot be legally referenced outside of the class

    //TODO: receive data and insert it into the database
    insert(table, data) { //method
        if(Array.isArray(this.#database[table])) { //check if there is an array of users
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        return data
    }

    //TODO: read database and return data
    select(table) { //method
        const data = this.#database[table] ?? [] //nullish coalescing operator

        return data
    }
}