import fs from 'node:fs/promises'

//Creating a database based on files
// --Model: { "users": [{user}, ...] }
// --Command: database[table] => [{user}, ...]

//TODO: set the path of the db persistence file
const databasePath = new URL('../../db.json', import.meta.url)

export class Database {
    #database = {} //private propertie -  cannot be legally referenced outside of the class

    //db persistence
    constructor() {
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile('db.json', JSON.stringify(this.#database)) //Must be of type string or buffer
    }


    //TODO: receive data and insert it into the database
    insert(table, data) { //method
        if(Array.isArray(this.#database[table])) { //check if there is an array of users
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    //TODO: read database and return data
    select(table) { //method
        const data = this.#database[table] ?? [] //nullish coalescing operator

        return data
    }

    //TODO: read data and delete from database
    remove(table, id) { //method
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) { //if exists
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    //TODO: read data and update on database
    update(table, id, data) { //method
        const rowIndex = this.#database[table].findIndex(row => row.id == id)

        if (rowIndex > -1) { //if exists
            this.#database[table][rowIndex] = {id, ...data}
            this.#persist()
        }

        return data
    }
}