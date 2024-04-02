import fs from 'fs'

class Collection {
    constructor(name){
        this.name = name
    }


    //helpers

    _generateId() {
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }

    _loadDocuments(callback) {
        //validation
        if (typeof callback !== 'function') throw new TypeError ('callback is not a Function')

        //logic
        fs.readFile(`./data/${this.name}.json`, 'utf8', (error, documentsJSON) => {
            if (error){
                callback(error)

                return
            }

            const documents = JSON.parse(documentsJSON || '[]')

            callback(null, documents)
        })
    }

    _saveDocuments(documents, callback) {
        //validation
        if (!(documents instanceof Array)) throw new TypeError ('documents is not an Array')
        if (typeof callback !== 'function') throw new TypeError('callback is not a Function')

        documents.forEach(document => {
            if(!(document instanceof Object)) throw new TypeError('some elements in documents are not a document')
        })

        //logic
        const documentsJSON = JSON.stringify(documents)

        fs.writeFile(`./data/${this.name}.json`, documentsJSON, error => {
            if (error) {
                callback(error)

                return
            }
            callback(null)
        })
    }


    // CRUD

    findOne (condition, callback){
        //validation
        if(typeof condition !== 'function') throw new TypeError ('condition is not a Function')
        if (!(callback instanceof Function)) throw new TypeError ('callback is not a Function')

        //logic
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }
            const document = documents.find(condition)

            callback(null, document || null)
        })
    }

    insertOne (document, callback){
        //validation
        if (!(document instanceof Object)) throw new TypeError ('document is not an Object')
        if (typeof callback !== 'function') throw new TypeError ('callback is not a Function')

        //logic
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            document.id = this._generateId()

            documents.push(document)

            this._saveDocuments(documents, error => {
                if(error) {
                    callback(error)

                    return
                }

                callback(null, document.id)
            })
        })
    }

    updateOne(condition, document, callback) {
        //validation
        if (typeof condition !== 'function') throw new TypeError('condition is not a Function')
        if (!(document instanceof Object)) throw new TypeError('document is not an Object')
        if (typeof callback !== 'function') throw new TypeError('callback is not a Function')

        //logic
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }

            const index = documents.findIndex(condition)

            if (index > -1){
                documents.splice(index, 1, document)

                this._saveDocuments(documents, error => {
                    if(error){
                        callback(error)

                        return
                    }
                    callback(null, true)
                })
                return
            }
            callback(null, false)
        })
    }

    deleteOne (condition, callback){
        //validation
        if (typeof condition !== 'function')
            throw new TypeError ('condition is not a Function')
        if (typeof callback !== 'function')
            throw new TypeError ('callback is not a Function')

        //logic
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }
            const index = documents.findIndex(condition)

            if (index > -1){
                documents.splice(index, 1)
    
                this._saveDocuments(documents, error => {
                    if (error) {
                        callback(error)

                        return
                    }
                    callback(null, true)
                })
                return
            }
            callback(null, false)
        })
    }

    getAll (callback) {
        //validation
        if(typeof callback !== 'function')
            throw new TypeError('callback is not a Function')

        //logic
        this._loadDocuments((error, documents) => {
            if (error) {
                callback(error)

                return
            }
            callback(null, documents)
        })
    }
}

export default Collection