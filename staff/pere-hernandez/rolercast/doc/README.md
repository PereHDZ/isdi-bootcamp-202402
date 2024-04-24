# ROLERCAST

## Intro

Easily create your own D&D character

![](https://media.giphy.com/media/LmTQNn97DI0SfSu1Ws/giphy.gif?cid=790b7611v347symzgmqfnl8vzky4fqw8c6k9i5zk94sa9ad0&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

- List pre-generated characters
- Choose pre-generated character
- Create a character
- Edit a character
- Delete a character
- Export a character sheet in PDF format
- Publish characters
- Find published characters
- Request friendship
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

Stats
- strength (number, optional)
- dexterity (number, optional)
- constitution (number, optional)
- intelligence (number, optional)
- wisdom (number, optional)
- charisma (number, optional)

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

Class
- id (required)
- name (string, required)
- description (string, required)
- stats (Stats)
- skills (Skills)
- inventory ([Equipment.id], required)

Equipment 
- id (required)
- name (string, required)
- type (string, required, enum: ...)
- stats (Stats)
- skills (Skills)

Race
- id (required)
- name (string, required)
- description (string, required)
- icon (string, required)
- stats (Stats)
- skills (Skills)

Character
- id (required)
- class (Class.id, required)
- name (string, optional)
- creator (User.id, required)
- race (Race.id, required)
- visibility (string, required, enum public|private|shared)
- stats (Stats)
- skills (Skills)
- inventory ([Equipment.id])