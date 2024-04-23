import mongoose from 'mongoose'

import { Race } from '.'

mongoose.connect('mongodb://localhost:27017/rolercast')
    .then(() => Race.deleteMany())
        .then(() => 
            Promise.all([
                Race.create({ name: 'Dragonborn', description: 'A proud race that values clan and skills above all else. Once enslaved by dragons, they strive to be self-sufficient, not wanting to be beholden to anyone, not even the gods.'}),
                Race.create({ name: 'Human', description: 'The most common face to see in Faerûn, humans are known for their tenacity, creativity, and endless capacity for growth.'}),
                Race.create({ name: 'Elf', description: "With an ethereal countenance and long lifespans, elves are at home with nature's power, flourishing in light and dark alike."}),
                Race.create({ name: 'Drow', description: "Driven to the Underdark, most drow have adopted a ruthless pragmatism. While the Lolth-sworn delight in the goddess' evil tenets, the Seldarine reject Her attempt to overthrow the leader of the elven pantheon."}),
                Race.create({ name: 'Half-Elf', description: 'Half-Elves inherit blessings from both their parents, but at the price of never quite fitting in. Curious, ambitious, and versatile, half-elves are welcome everywhere, but struggle without a community to call their own.'}),
                Race.create({ name: 'Half-Orc', description: 'Creatures of intense emotion, Half-Orcs are more inclined to act than contemplate - whether the rage burning their bodies compels them to fight, or the love filling their hearts inspires acts of incredible kindness.'}),
                Race.create({ name: 'Halfling', description: 'Small yet capable, halflings prefer the comforts of home and hearth - but their natural luck and dexterity makes them fine adventurers.'}),
                Race.create({ name: 'Dwarf', description: 'As durable and unyielding as their homes of stone, dwarves are some of the finest warriors, miners, and smiths of Faerûn.'}),
                Race.create({ name: 'Gnome', description: "Small, clever, and energetic, gnomes use their long lives to explore Faerûn's brightest corners and darkest depths."}),
                Race.create({ name: 'Tiefling', description: 'Descended from devils of the Nine Hells - by blood or curse - tieflings face constant suspicion in Faerûn. Their arcane abilities make them natural survivors, whether as heroes or villains.'}),
                Race.create({ name: 'Githyanki', description: 'With a ruthlessness borne from mind flayer enslavement, githyanki ride the Astral Sea atop red dragons, bringing their silver swords and psionic might to bear against any trace of the illithid menace.'})
            ])
        )

        .then(() => mongoose.disconnect())
        .then(() => console.log('populated'))
        .catch(console.error)