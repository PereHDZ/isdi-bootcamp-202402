# ROLERCAST

## Intro

Easily create your own D&D character

![](https://media.giphy.com/media/LmTQNn97DI0SfSu1Ws/giphy.gif?cid=790b7611v347symzgmqfnl8vzky4fqw8c6k9i5zk94sa9ad0&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

- List pre-generated characters
- Create characters
- Export your character sheet in PDF format
- Publish characters
- Find published characters
- Add friends to your friendlist
- Share characters with friends

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
- Tailwind
- Mongo

### Data model

User
- id (required)
- username (string, required)
- email (string, required)
- password (stirng, required)
- avatar (png, optional)

Class
- name (string, required)
- bonus (Array[integer], required)

Race
- name (string, required)
- bonus (Array[integer], required)

Character
- id (required)
- class (Class, required)
- name (string, optional)
- creator (id, required)
- race (Race, required)
- stats ({
    strength: (integer, required),
    dexterity: (integer, required),
    constitution: (integer, required),
    intelligence: (integer, required),
    wisdom: (integer, required),
    charisma: (integer, required)
})
- skills ({
    acrobatics (integer, required)
    animal handling (integer, required)
    arcana (integer, required)
    athletics (integer, required)
    deception (integer, required)
    history (integer, required)
    insight (integer, required)
    intimidation (integer, required)
    investigation (integer, required)
    medicine (integer, required)
    nature (integer, required)
    perception (integer, required)
    performance (integer, required)
    persuasion (integer, required)
    religion (integer, required)
    sleight of Hand (integer, required)
    stealth (integer, required)
    survival (integer, required)
})
- inventory
- public (boolean, required)