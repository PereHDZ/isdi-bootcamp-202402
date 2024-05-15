# ROLERCAST

## Intro

Easily create your own Baldur's Gate 3 character

![](https://media.giphy.com/media/LmTQNn97DI0SfSu1Ws/giphy.gif?cid=790b7611v347symzgmqfnl8vzky4fqw8c6k9i5zk94sa9ad0&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

- List generated characters
- Create a character
- Delete a character

ToDo: testing

v.0.1
- Publish characters
- Find published characters
- Request friendship
- Share characters with friends
- Add Level Progression
- Export a character sheet in PDF format

Future versions
- Implement more role-playing games other than D&D
- Implement a campaign creation & management tool
- Implement character dynamics tool
- Add locations and maps
- Add buildings
- Add vehicles


### UI design

[Figma](https://www.figma.com/file/ZmMniRVfWilNewsr5R07BQ/Rolercast?type=design&node-id=0-1&mode=design&t=7S9MgdeeESf4NqfP-0)

## Technical

### Modules

- api (server logic)
- app (client interface)
- com (common utils, tools...)

### Technologies

- TypeScript
- React
- Express
- Node
- Mongo

### Data model

User
- id (required)
- username (string, required)
- email (string, required)
- password (stirng, required)
- avatar (png, optional)

Action
- name (string, required)
- description (string, required)

Archetype
- name (string, required)
- description (string, required)
- proficiencies: (Proficiencies, optional)
- knownCantrip: (Cantrip.id, optional)
- knownSpell: (Spell.id, optional)

Deity
- name (string, required)
- description (string, required)

Weapons
- daggers(number, optional)
- sickles (number, optional)
- handAxes (number, optional)
- clubs (number, optional)
- greatClubs(numbers, optional)
- maces (number, optional)
- lightHammers (number, optional)
- quarterstaves (number, optional)
- spears (number, optional)
- javelins (number, optional)
- scimitars (number, optional)
- shortSwords (number, optional)
- longSwords (number, optional)
- flails (number, optional)
- morningstar (number, optional)
- rapiers (number, optional)
- warPicks (number, optional)
- battleAxes (number, optional)
- warHammers (number, optional)
- glaives (number, optional)
- greatAxes (number, optional)
- greatSwords (number, optional)
- halberds (number, optional)
- mauls (number, optional)
- pikes (number, optional)
- lightCrossbows (number, optional)
- shortbows (number, optional)
- tridents (number, optional)
- handCrossbows (number, optional)
- heavyCrossbows (number, optional)
- longbows (number, optional)

Armour
- lightArmour (number, optional)
- mediumArmour (number, optional)
- heavyArmour (number, optional)
- shields (number, optional)

Skills
- acrobatics (number, optional)
- animal handling (number, optional)
- arcana (number, optional)
- athletics (number, optional)
- deception (number, optional)
- history (number, optional)
- insight (number, optional)
- intimidation (number, optional)
- investigation (number, optional)
- medicine (number, optional)
- nature (number, optional)
- perception (number, optional)
- performance (number, optional)
- persuasion (number, optional)
- religion (number, optional)
- sleight of Hand (number, optional)
- stealth (number, optional)
- survival (number, optional)

Proficiencies
- weapons (Weapons, required)
- armors (Armors, required)
- skills (Skills, required)

Features
- humanVersatility (HumanVersatility, optional)
- feyAncestry (FeyAncestry, optional)
- darkvision (Darkvision, optional)
- superiorDarkvision (SuperiorDarkvision, optional)
- highElfCantrip (HighElfCantrip, optional)
- fleetOfFoot (FleetOfFoot, optional)
- drowMagic (DrowMagic, optional)
- duergarMagic (DuergarMagic, optional)
- halflingLuck (HalflingLuck, optional)
- brave (Brave, optional)
- strongheartResilience (StrongheartResilience, optional)
- duergarResilience (DuergarResilience, optional)
- dwarvenToughness (DwarvenToughness, optional)
- gnomeCunning (GnomeCunning, optional)
- additionalSpell (AdditionalSpell, optional)
- stoneCamuflage (StoneCamuflage, optional)
- hellishResistance (HellishResistance, optional)
- tieflingMagic (TieflingMagic, optional)
- astralKnowledge (AstralKnowledge, optional)
- githyankiPsionics (GithyankiPsionics, optional)
- draconicAncestry (DraconicAncestry, optional)
- acidBreath (AcidBreath, optional)
- lightningBreath (LightningBreath, optional)
- fireBreath (FireBreath, optional)
- poisonBreath (PoisonBreath, optional)
- frostBreath (FrostBreath, optional)
- dwarvenResilience (DwarvenResilience, optional)
- savageAttacks (SavageAttacks, optional)
- relentlessEndurance (RelentlessEndurance, optional)

Cantrip
- name (string, required)
- description (string, required)

Spell
- name (string, required)
- description (string, required)

Race
- id (required)
- name (string, required)
- description (string, required)
- speed (number, optional)
- features (Features, optional)
- proficiencies (Proficencies, optional)
- parent (Race.id, optional)

CharacterClass 
- id (required)
- name (string, required)
- description (string, required)
- hp (number, optional)
- hpPerLevel (number, optional)
- keyHabilites: (KeyHabilities, optional)
- savingThrowProficiencies: (SavingThrowProficiencies, optional)
- proficiencies: (Proficiencies, optional)
- skillCount: (number, optional)
- expertises: (Skills, optional)
- spellcastingAbility (string, optional)
- spellCasting (SpellCasting, optional)
- knownSpells ([Spell.id], optional)
- knownCantrips ([Cantrip.id], optional)
- knownActions ([Action.id], optional)
- parent (Class.id, optional)

Background
- id (required)
- name (string, required)
- description (string, required)
- skills: (Skill, required)

Character
- id (required)
- author (User.id, required)
- name (string, required)
- race (Race.id, required)
- characterClass (CharacterClass.id, required)
- background (Background.id, required)
- hp (number, required)
- stats (Stats, required)
- proficiencies (Proficencies, required)
- expertises (Skills, optional)
- cantrips ([Cantrip.id], optional)
- spells ([Spell.id], optional)
- actions ([Action.id], optional)
- instrument (string, optional)
- deity (Deity.id, optional)
- fightingStyle (FightingStyle.id, optional)
- archetype (Archetype.id, optional)
- naturalExplorer (NaturalExplorer.id, optional)

Stats
- strength (number, optional)
- dexterity (number, optional)
- constitution (number, optional)
- intelligence (number, optional)
- wisdom (number, optional)
- charisma (number, optional)