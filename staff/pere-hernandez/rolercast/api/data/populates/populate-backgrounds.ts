import mongoose from 'mongoose'

import { Background, Skills } from '../models'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Background.deleteMany())
    .then(() => 
        Promise.all([
            Background.create({ name: 'Acolyte', description: 'You have spent your life in service to a temple, learning sacred rites and providing sacrifices to the god or gods you worship.', skills: new Skills({ insight: 1, religion: 1 }) }),
            Background.create({ name: 'Charlatan', description: "You're an expert in manipulation, prone to exaggeration and more than happy to profit from it. Bending the truth and turning allies against each other will bring you success down the road.", skills: new Skills({ deception: 1, sleightOfHand: 1 }) }),
            Background.create({ name: 'Criminal', description: 'You have a history of breaking the law and survive by leveraging less-than-legal connections. Profiting from criminal enterprise will lead to greater opportunities in the future.', skills: new Skills({ deception: 1, stealth: 1 }) }),
            Background.create({ name: 'Entretainer', description: 'You live to sway and subvert your audience, engaging common crowds and high society alike. Preserving art and bringing joy to the hapless and downtrodden heightens your charismatic aura.', skills: new Skills({ acrobatics: 1, performance: 1 }) }),
            Background.create({ name: 'Folk Hero', description: "You're the champion of the common people, challenging tyrants and monsters to protect the helpless. Saving innocents in imminent danger will make your legend grow.", skills: new Skills({ animalHandling: 1, survival: 1 }) }),
            Background.create({ name: 'Guild Artisan', description: 'Your skill in a particular craft has earned you membership in a mercantile guild, offering privileges and protection while engaging in your art. Repairing and discovering rare crafts will bring new inspiration.', skills: new Skills({ insight: 1, persuasion: 1 }) }),
            Background.create({ name: 'Noble', description: 'You were raised in a family among the social elite, accustomed to power and privilege. Accumulating renown, power, and loyalty will raise your status.', skills: new Skills({ history: 1, persuasion: 1 }) }),
            Background.create({ name: 'Outlander', description: 'You grew up in the wilds, learning to survive far from the comforts of civilisation. Surviving unusual hazards of the wild will enhance your prowess and understanding.', skills: new Skills({ athletics: 1, survival: 1 }) }),
            Background.create({ name: 'Sage', description: "You're curious and well-read, with an unending thirst for knowledge. Learning about rare lore of the world will inspire you to put this knowledge to greater purpose.", skills: new Skills({ arcana: 1, history: 1 }) }),
            Background.create({ name: 'Soldier', description: 'You are trained in battlefield tactics and combat, having served in a militia, mercenary company, or officer corps. Show smart tatics and bravery on the battlefield to enhance your prowess.', skills: new Skills({ athletics: 1, intimidation: 1 }) }),
            Background.create({ name: 'Urchin', description: 'After surviving a poor and bleak childhood, you know how to make the most out of very little. Using your street smarts bolsters your spirit for the journey ahead.', skills: new Skills({ sleightOfHand: 1, stealth: 1 }) }),
        ])
    )
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)
