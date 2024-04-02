class Collection {
    constructor(name){
        this.name = name
    }


    //helpers

    _generateId = function() {
        return (+((parseInt(Math.random() * 10 ** 17)).toString())).toString(36)
    }

    _loadDocuments = function () {
        var documentsJSON = localStorage[this.name]

        var documents = JSON.parse(documentsJSON || '[]')

        return documents
    }

    _saveDocuments = function (documents) {
        //validation

        if (!(documents instanceof Array))
            throw new TypeError ('documents is not an Array')

        documents.forEach(function (document){
            if(!(document instanceof Object))
                throw new TypeError('some elements in documents are not a document')
        })

        //logic
        var documentsJSON = JSON.stringify(documents)

        localStorage[this.name] = documentsJSON
    }

    _backup = function (){
        localStorage[this.name + '_backup'] = localStorage[this.name]
    }

    _restore = function (){
        localStorage[this.name] = localStorage[this.name + '_backup']
    }



    // CRUD

    findOne = function (callback) {
        //validation

        if (!(callback instanceof Function))
            throw new TypeError ('callback is not a Function')

        //logic
        var documents = this._loadDocuments()

        var document = documents.find(callback)

        return document
    }

    insertOne = function (document) {
        //validation

        if (!(document instanceof Object))
            throw new TypeError ('document is not an Object')

        //logic
        var documents = this._loadDocuments()

        document.id = this._generateId()

        documents.push(document)

        this._saveDocuments(documents)
    }

    updateOne = function (document) {
        //validation

        if (!(document instanceof Object))
            throw new TypeError('document is not an Object')
        if (typeof document.id !== 'string')
            throw new TypeError('id must be a string')

        //logic
        var documents = this._loadDocuments()

        var index = documents.findIndex(function (document2) {
            return document2.id === document.id
        })

        if (index > -1){
            documents.splice(index, 1, document)

            this._saveDocuments(documents)
        }
    }

    deleteOne = function (callback){
        //validation

        if (!(callback instanceof Function))
            throw new TypeError ('callback is not a Function')

        //logic
        var documents  = this._loadDocuments()

        var index = documents.findIndex(callback)

        if (index > -1){
            documents.splice(index, 1)

            this._saveDocuments(documents)
        }
    }

    getAll = function (){
        var documents = this._loadDocuments()

        return documents
    }

    printAll = function () {
        var documents = this._loadDocuments()

        console.table(documents)
    }
}

export default Collection