describe('Collection', function(){
    describe('constructor', function(){
        it('creates a collection', function(){
            var cars = new Collection('cars')

            expect(cars).toBeInstanceOf(Collection)
        })
    })




    describe('> helpers', function(){
        describe('_generateId', function(){
            it('generates an id', function(){
                var cars = new Collection('cars')

                var id1 = cars._generateId()

                expect(typeof id1).toBe('string')

                var id2 = cars._generateId()

                expect(typeof id2).toBe('string')

                expect(id1 === id2).toBe(false)

                delete (localStorage.cars)
            })
        })



        describe('_loadDocuments', function(){
            it('loads empty array on a new collection', function(){
                delete (localStorage.cars)

                var cars = new Collection('cars')

                var documents  = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(0)
            })

            it('loads data on non-empty collection', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand": "Renault", "model": "Megane"}, {"brand": "Peugeot", "model": "208"}]'

                var cars = new Collection('cars')

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(2)

                expect(documents[0]).toBeInstanceOf(Object)
                expect(documents[0].brand).toBe('Renault')
                expect(documents[0].model).toBe('Megane')

                expect(documents[1]).toBeInstanceOf(Object)
                expect(documents[1].brand).toBe('Peugeot')
                expect(documents[1].model).toBe('208')

                delete (localStorage.cars)
            })
        })



        describe('_saveDocuments', function(){
            it('should save a collection', function(){
                delete (localStorage.cars)

                var documents = [{"brand": "Renault", "model": "Megane"}, {"brand": "Peugeot", "model": "208"}]

                var cars = new Collection ('cars')

                cars._saveDocuments(documents)

                expect(!!localStorage.cars).toBe(true)
                expect(typeof localStorage.cars).toBe('string')

                var documentsString = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                expect(localStorage.cars).toBe(documentsString)

                delete (localStorage.cars)
            })

            it('should fail on non-Array documents', function(){
                delete (localStorage.cars)

                var documents = 'I am not an Array'

                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(!!localStorage.cars).toBe(false)

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('documents is not an Array')

                delete (localStorage.cars)
            })

            it('should fail on documents being an Array of non-documents', function (){
                delete (localStorage.cars)

                var documents = ['I am not an Object', 123]

                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(!!localStorage.cars).toBe(false)

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('some elements in documents are not a document')

                delete (localStorage.cars)
            })
        })



        describe('_backup', function(){
            it('should create a backup copy', function(){
                delete (localStorage.cars)
                delete (localStorage.cars_backup)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                cars._backup()

                expect(!!localStorage.cars_backup).toBe(true)

                expect(localStorage.cars_backup).toBe(localStorage.cars)

                delete (localStorage.cars)
                delete (localStorage.cars_backup)
            })
        })



        describe('_restore', function(){
            it('should restore a collection', function(){
                delete (localStorage.cars)
                delete (localStorage.cars_backup)

                localStorage.cars_backup = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                cars._restore()

                expect(!!localStorage.cars).toBe(true)

                expect(localStorage.cars).toBe(localStorage.cars_backup)

                delete (localStorage.cars)
                delete (localStorage.cars_backup)
            })
        })
    })




    describe('> CRUD', function(){
        describe('findOne', function(){
            it('should find an existing document', function(){
                delete (localStorage.cars)
                delete (localStorage.cars_backup)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                var car = cars.findOne(function (car){
                    return car.brand === 'Renault'
                })

                expect(!!car).toBe(true)
                expect(car).toBeInstanceOf(Object)
                expect(car.brand).toBe('Renault')
                expect(car.model).toBe('Megane')

                delete (localStorage.cars)
                delete (localStorage.cars_backup)
            })

            it('should return undefined on no matches', function(){
                delete (localStorage.cars)
                delete (localStorage.cars_backup)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                var car = cars.findOne(function (car){
                    return car.brand === 'Fiat'
                })

                expect(!!car).toBe(false)
                expect(car).toBe(undefined)

                delete (localStorage.cars)
                delete (localStorage.cars_backup)
            })

            it('should fail on callback not a function', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                var errorThrown

                try {
                    var car = cars.findOne('I am not a Function')
                } catch (error) {
                    errorThrown = error
                }

                expect(!!car).toBe(false)

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a Function')

                delete (localStorage.cars)
            })
        })



        describe('insertOne', function(){
            it('should insert a document in a collection', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Toyota', model: 'Yaris'}

                cars.insertOne(car)

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!localStorage.cars).toBe(true)
                expect(parsedCars.length).toBe(3)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')

                expect(parsedCars[2].brand).toBe('Toyota')
                expect(parsedCars[2].model).toBe('Yaris')

                delete (localStorage.cars)
            })


            it('should not work on non-Object document', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection ('cars')

                var car = 'I am not an Object'

                var errorThrown

                try {
                    cars.insertOne(car)
                } catch (error) {
                    errorThrown = error
                }

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!localStorage.cars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('document is not an Object')

                delete (localStorage.cars)
            })
        })



        describe('updateOne', function(){
            it('should find a document in its Collection and change its values', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Toyota', model: 'Yaris', id: "1"}

                cars.updateOne(car)

                var parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Toyota')
                expect(parsedCars[0].model).toBe('Yaris')
                expect(parsedCars[0].id).toBe("1")

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')
                expect(parsedCars[1].id).toBe("2")

                delete (localStorage.cars)
            })


            it('should fail on no matches', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Toyota', model: 'Yaris', id: '1'}

                cars.updateOne(car)

                var parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')

                delete (localStorage.cars)
            })


            it('should fail on non-Object document', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = 'I am not an Object'

                var errorThrown

                try {
                    cars.updateOne(car)
                } catch (error) {
                    errorThrown = error
                }

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')
                expect(parsedCars[0].id).toBe("1")

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')
                expect(parsedCars[1].id).toBe("2")

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('document is not an Object')

                delete (localStorage.cars)
            })

            it ('should fail on non-string document.id', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Toyota', model: 'Yaris', id: 1}

                var errorThrown

                try {
                    cars.updateOne(car)
                } catch (error) {
                    errorThrown = error
                }

                var parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')
                expect(parsedCars[0].id).toBe("1")

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')
                expect(parsedCars[1].id).toBe("2")

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('id must be a string')

                delete (localStorage.cars)
            })
        })



        describe('deleteOne', function(){
            it('should delete document from Collection', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Renault', model: 'Megane', id: "1"}

                cars.deleteOne(function (car1){
                    return car1.id === car.id
                })

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(1)

                expect(parsedCars[0].brand).toBe('Peugeot')
                expect(parsedCars[0].model).toBe('208')
                expect(parsedCars[0].id).toBe('2')

                delete (localStorage.cars)
            })


            it('should fail on no matches', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Toyota', model: 'Yaris', id: '3'}

                cars.deleteOne(function (car1){
                    return car1.id === car.id
                })

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')
                expect(parsedCars[0].id).toBe('1')

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')
                expect(parsedCars[1].id).toBe('2')

                delete (localStorage.cars)
            })


            it('should fail on non-Function callback', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                var car = {brand: 'Renault', model: 'Megane', id: '1'}

                var errorThrown

                try {
                    cars.deleteOne(car)
                } catch (error) {
                    errorThrown = error
                }

                parsedCars = JSON.parse(localStorage.cars)

                expect(!!parsedCars).toBe(true)
                expect(parsedCars.length).toBe(2)

                expect(parsedCars[0].brand).toBe('Renault')
                expect(parsedCars[0].model).toBe('Megane')
                expect(parsedCars[0].id).toBe('1')

                expect(parsedCars[1].brand).toBe('Peugeot')
                expect(parsedCars[1].model).toBe('208')
                expect(parsedCars[1].id).toBe('2')
                
                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a Function')

                delete (localStorage.cars)
            })
        })



        describe('getAll', function(){
            it('should return an Array of documents', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars')

                documents = cars.getAll()

                expect(!!documents).toBe(true)
                expect(Array.isArray(documents)).toBe(true)
                expect(documents.length).toBe(2)

                expect(documents[0].brand).toBe('Renault')
                expect(documents[0].model).toBe('Megane')
                expect(documents[0].id).toBe('1')

                expect(documents[1].brand).toBe('Peugeot')
                expect(documents[1].model).toBe('208')
                expect(documents[1].id).toBe('2')

                delete (localStorage.cars)
            })
        })



        describe('printAll', function(){
            it('should print a table of a Collection', function(){
                delete (localStorage.cars)

                localStorage.cars = '[{"brand":"Renault","model":"Megane","id":"1"},{"brand":"Peugeot","model":"208","id":"2"}]'

                var cars = new Collection('cars') 

                cars.printAll()

                delete (localStorage.cars)
            })
        })
    })
})