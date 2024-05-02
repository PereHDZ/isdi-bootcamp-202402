import mongoose from 'mongoose'

import { RaceAction } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => RaceAction.deleteMany())
    .then(() => 
        Promise.all([
            RaceAction.create({ name: 'Acid Breath', description: 'Spew forth a cone of acid.'}),
            RaceAction.create({ name: 'Lightning Breath', description: 'Spew forth a cone of lightning.'}),
            RaceAction.create({ name: 'Fire Breath', description: 'Spew forth a column of fire.'}),
            RaceAction.create({ name: 'Poison Breath', description: 'Spew forth a cone of poison.'}),
            RaceAction.create({ name: 'Frost Breath', description: 'Spew forth a cone of ice.'})
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)