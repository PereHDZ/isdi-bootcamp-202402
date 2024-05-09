import mongoose, { ObjectId } from 'mongoose'

import { NaturalExplorer, Proficiencies, Skills } from '../models'

const { Types: { ObjectId } } = mongoose

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => NaturalExplorer.deleteMany())
    .then(() => 
        Promise.all([
            NaturalExplorer.create({ 
                name: 'Beast Tamer', 
                description: 'You have cultivated a strong bond with animals. You can cast Find Familiar as a ritual.',
                knownSpell: new ObjectId('66335a87863710c59eae0f57')
            }),                    
            NaturalExplorer.create({ 
                name: 'Urban Tracker', 
                description: 'An expert at navigating the wild within the city, you gain Sleight of Hand Proficiency.',
                proficiencies: new Proficiencies({ skills: new Skills({ sleightOfHand: 1}) })
            }),
            NaturalExplorer.create({ 
                name: 'Wasteland Wanderer: Cold', 
                description: 'You have spent endless days surviving desolate tundras. Gain resistance to Cold damage, taking only half damage from it.'
            }),
            NaturalExplorer.create({ 
                name: 'Wasteland Wanderer: Fire', 
                description: 'You have spent endless days surviving forbidding deserts. Gain resistance to Fire, taking only half damage from it.'
            }),
            NaturalExplorer.create({ 
                name: 'Wasteland Wanderer: Poison', 
                description: 'You have spent endless days surviving fetid swamps. Gain resistance to Poison, taking only half damage from it.'
            })
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)