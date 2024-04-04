import { readFile, writeFile } from 'fs';
import Collection from './Collection.js';
import { expect } from 'chai';
describe('Collection', () => {
    describe('constructor', () => {
        it('creates a collection', () => {
            const cars = new Collection('cars');
            expect(cars).to.be.instanceOf(Collection);
        });
    });
    describe('> helpers', () => {
        describe('_generateId', () => {
            it('generates an id', () => {
                const cars = new Collection('cars');
                const id1 = cars._generateId();
                expect(typeof id1).to.equal('string');
                const id2 = cars._generateId();
                expect(typeof id2).to.equal('string');
                expect(id1 === id2).to.equal(false);
            });
        });
        describe('_loadDocuments', () => {
            it('loads empty array on a new collection', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                });
                const cars = new Collection('cars');
                cars._loadDocuments((error, documents) => {
                    if (error) {
                        done(error);
                        return;
                    }
                    expect(error).to.be.null;
                    expect(documents).to.be.instanceOf(Array);
                    expect(documents.length).to.equal(0);
                    done();
                });
            });
            it('loads data on non-empty collection', done => {
                writeFile('./data/cars.json', '[{"brand": "Renault", "model": "Megane"}, {"brand": "Peugeot", "model": "208"}]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(error).to.be.null;
                        expect(documents).to.be.instanceOf(Array);
                        expect(documents.length).to.equal(2);
                        expect(documents[0]).to.be.instanceOf(Object);
                        expect(documents[0].brand).to.equal('Renault');
                        expect(documents[0].model).to.equal('Megane');
                        expect(documents[1]).to.be.instanceOf(Object);
                        expect(documents[1].brand).to.equal('Peugeot');
                        expect(documents[1].model).to.equal('208');
                        done();
                    });
                });
            });
        });
        describe('_saveDocuments', () => {
            it('saves a collection', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const documents = [{ "brand": "Renault", "model": "Megane" }, { "brand": "Peugeot", "model": "208" }];
                    const cars = new Collection('cars');
                    cars._saveDocuments(documents, error => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(error).to.be.null;
                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error);
                                return;
                            }
                            expect(!!documentsJSON).to.be.true;
                            expect(documentsJSON).to.equal(JSON.stringify(documents));
                            done();
                        });
                    });
                });
            });
            it('fails on non-Array documents', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const document = 'I am not an Array';
                    const cars = new Collection('cars');
                    let errorThrown;
                    try {
                        cars._saveDocuments(document, () => { });
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('documents is not an Array');
                    done();
                });
            });
            it('fails on documents being an Array with non-documents', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const documents = ['I am not an Object', 123, { color: 'red' }];
                    const cars = new Collection('cars');
                    let errorThrown;
                    try {
                        cars._saveDocuments(documents, () => { });
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('some elements in documents are not a document');
                    done();
                });
            });
        });
    });
    describe('> CRUD', () => {
        describe('findOne', () => {
            it('finds an existing document', done => {
                writeFile('./data/cars.json', '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    cars.findOne(car => car.brand === 'Renault', (error, car) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(error).to.be.null;
                        expect(car).to.be.instanceOf(Object);
                        expect(car.brand).to.equal('Renault');
                        expect(car.model).to.equal('Megane');
                        done();
                    });
                });
            });
            it('returns null on no matches', done => {
                writeFile('./data/cars.json', '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    cars.findOne(car => car.brand === 'Fiat', (error, car) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(error).to.be.null;
                        expect(car).to.be.null;
                        done();
                    });
                });
            });
            it('fails on no callback', done => {
                writeFile('./data/cars.json', '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    let errorThrown;
                    try {
                        // @ts-ignore
                        cars.findOne();
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('condition is not a Function');
                    done();
                });
            });
            it('fails on callback not a function', done => {
                writeFile('./data/cars.json', '[{"brand":"Renault","model":"Megane"},{"brand":"Peugeot","model":"208"}]', error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    let errorThrown;
                    try {
                        // @ts-ignore
                        cars.findOne('I am not a Function');
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('condition is not a Function');
                    done();
                });
            });
        });
        describe('insertOne', () => {
            it('inserts a document in a collection', done => {
                const documents = [{ "brand": "Renault", "model": "Megane", id: "1" }, { "brand": "Peugeot", "model": "208", id: "2" }];
                const documentsJSON = JSON.stringify(documents);
                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    const car = { brand: 'Toyota', model: 'Yaris' };
                    cars.insertOne(car, (error, insertedId) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(insertedId).to.be.a.string;
                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error);
                                return;
                            }
                            const documents = JSON.parse(documentsJSON);
                            expect(documents).to.have.lengthOf(3);
                            expect(documents[2]).to.deep.equal(car);
                            done();
                        });
                    });
                });
            });
            it('fails on non-Object document', done => {
                const documents = [{ "brand": "Renault", "model": "Megane", id: "1" }, { "brand": "Peugeot", "model": "208", id: "2" }];
                const documentsJSON = JSON.stringify(documents);
                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    const notACar = 'I am not a Car';
                    let errorThrown;
                    try {
                        // @ts-ignore
                        cars.insertOne(notACar);
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('document is not an Object');
                    done();
                });
            });
            it('fails on non-Function callback', () => {
                const cars = new Collection('cars');
                const car = { brand: 'Toyota', model: 'Yaris' };
                const notAFunction = 'I am not a Function';
                let errorThrown;
                try {
                    cars.insertOne(car, notAFunction);
                }
                catch (error) {
                    errorThrown = error;
                }
                expect(errorThrown).to.be.instanceOf(TypeError);
                expect(errorThrown.message).to.equal('callback is not a Function');
            });
        });
        describe('updateOne', () => {
            it('finds a document in its Collection and changes its values', done => {
                const documents = [{ "brand": "Renault", "model": "Megane", "id": "1" }, { "brand": "Peugeot", "model": "208", "id": "2" }];
                const documentsJSON = JSON.stringify(documents);
                writeFile('./cars.json', documentsJSON, error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    const document = { brand: 'Toyota', model: 'Yaris', id: '1' };
                    cars.updateOne(car => car.id === document.id, document, (error, updated) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(updated).to.be.true;
                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error);
                                return;
                            }
                            const documents = JSON.parse(documentsJSON);
                            expect(documents).to.have.lengthOf(2);
                            expect(documents[0]).to.deep.equal(document);
                            done();
                        });
                    });
                });
            });
            it('does nothing on non-existing document', done => {
                const documents = [{ "brand": "Renault", "model": "Megane" }, { "brand": "Peugeot", "model": "208" }];
                const documentsJSON = JSON.stringify(documents);
                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    const document = { brand: 'Toyota', model: 'Yaris', id: '1' };
                    cars.updateOne(car => car.id === '26', document, (error, updated) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        expect(updated).to.be.false;
                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error);
                                return;
                            }
                            const documents2 = JSON.parse(documentsJSON);
                            expect(documents2).to.deep.equal(documents);
                            done();
                        });
                    });
                });
            });
            it('fails on non-Function condition', () => {
                const cars = new Collection('cars');
                const condition = 'I am not a Function';
                let errorThrown;
                try {
                    // @ts-ignore
                    cars.updateOne(condition);
                }
                catch (error) {
                    errorThrown = error;
                }
                expect(errorThrown).to.be.instanceOf(TypeError);
                expect(errorThrown.message).to.equal('condition is not a Function');
            });
            it('fails on non-Object document', done => {
                const documents = [{ "brand": "Renault", "model": "Megane", "id": "1" }, { "brand": "Peugeot", "model": "208", "id": "2" }];
                const documentsJSON = JSON.stringify(documents);
                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error);
                        return;
                    }
                    const cars = new Collection('cars');
                    const document = 'I am not an Object';
                    let errorThrown;
                    try {
                        // @ts-ignore
                        cars.updateOne(() => document);
                    }
                    catch (error) {
                        errorThrown = error;
                    }
                    expect(errorThrown).to.be.instanceOf(TypeError);
                    expect(errorThrown.message).to.equal('document is not an Object');
                    done();
                });
            });
            it('fails on non-Function callback', () => {
                const cars = new Collection('cars');
                const callback = 'I am not a Function';
                const document = { brand: 'Toyota', model: 'Yaris', id: '1' };
                let errorThrown;
                try {
                    cars.updateOne(() => { }, document, callback);
                }
                catch (error) {
                    errorThrown = error;
                }
                expect(errorThrown).to.be.instanceOf(TypeError);
                expect(errorThrown.message).to.equal('callback is not a Function');
            });
        });
    });
    describe('deleteOne', () => {
        it('deletes document from Collection', done => {
            const documents = [{ "brand": "Renault", "model": "Megane", "id": "1" }, { "brand": "Peugeot", "model": "208", "id": "2" }];
            const documentsJSON = JSON.stringify(documents);
            writeFile('./data/cars.json', documentsJSON, error => {
                if (error) {
                    done(error);
                    return;
                }
                const cars = new Collection('cars');
                cars.deleteOne(car => car.id === '1', (error, deleted) => {
                    if (error) {
                        done(error);
                        return;
                    }
                    expect(deleted).to.be.true;
                    readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        const documents2 = JSON.parse(documentsJSON);
                        expect(documents2).to.have.lengthOf(1);
                        expect(documents2[0]).to.deep.equal(documents[1]);
                        done();
                    });
                });
            });
        });
        it('does nothing on non-existing document', done => {
            const documents = [{ "brand": "Renault", "model": "Megane", "id": "1" }, { "brand": "Peugeot", "model": "208", "id": "2" }];
            const documentsJSON = JSON.stringify(documents);
            writeFile('./data/cars.json', documentsJSON, error => {
                if (error) {
                    done(error);
                    return;
                }
                const cars = new Collection('cars');
                cars.deleteOne(car => car.id === '26', (error, deleted) => {
                    if (error) {
                        done(error);
                        return;
                    }
                    expect(deleted).to.be.false;
                    readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                        if (error) {
                            done(error);
                            return;
                        }
                        const documents2 = JSON.parse(documentsJSON);
                        expect(documents2).to.deep.equal(documents);
                        done();
                    });
                });
            });
        });
        it('fails on non-Function condition', () => {
            const cars = new Collection('cars');
            const condition = 'I am not a Function';
            let errorThrown;
            try {
                // @ts-ignore
                cars.deleteOne(condition);
            }
            catch (error) {
                errorThrown = error;
            }
            expect(errorThrown).to.be.instanceOf(TypeError);
            expect(errorThrown.message).to.equal('condition is not a Function');
        });
        it('fails on non-Function callback', () => {
            const cars = new Collection('cars');
            const callback = 'I am not a Function';
            let errorThrown;
            try {
                // @ts-ignore
                cars.deleteOne(() => callback);
            }
            catch (error) {
                errorThrown = error;
            }
            expect(errorThrown).to.be.instanceOf(TypeError);
            expect(errorThrown.message).to.equal('callback is not a Function');
        });
    });
    describe('getAll', () => {
        it('returns an Array of all documents', done => {
            const documents = [{ "brand": "Renault", "model": "Megane", "id": "1" }, { "brand": "Peugeot", "model": "208", "id": "2" }];
            const documentsJSON = JSON.stringify(documents);
            writeFile('./data/cars.json', documentsJSON, error => {
                if (error) {
                    done(error);
                    return;
                }
                const cars = new Collection('cars');
                cars.getAll((error, documents2) => {
                    if (error) {
                        done(error);
                        return;
                    }
                    expect(documents2).to.deep.equal(documents);
                    done();
                });
            });
        });
        it('fails on non-Fucntion callback', () => {
            const cars = new Collection('cars');
            const callback = 'I am not a Function';
            let errorThrown;
            try {
                cars.getAll(callback);
            }
            catch (error) {
                errorThrown = error;
            }
            expect(errorThrown).to.be.instanceOf(TypeError);
            expect(errorThrown.message).to.equal('callback is not a Function');
        });
    });
});
