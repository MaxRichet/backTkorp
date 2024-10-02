## Description

This project is a simple API that manages people and animals. It includes a complete CRUD for both tables, as well as several additional methods to retrieve specific information. For a full list of queries, please refer to the bottom of the Readme.

## Project setup

### 1.
Download this repository : https://github.com/MaxRichet/backTkorp

### 2.
Import .sql file in your database

### 3.
```bash
npm install
```

### 4.
```bash
npm run start
```

### 5.
Go on : [localhost:3006/graphql](http://localhost:3006/graphql)

## GraphQl Query

### Person
```
Requête createPerson :
mutation {
  createPerson(
    PersonInput: {
      lastName: "Richet"
      firstName: "Max"
      email: "maxrichet78@gmail.com"
      phoneNumber: "0625683374"
    }
  ) {
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

findAllPerson :
query{
  findAllPerson{
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

findPersonbyId :
query {
  findPersonById(id: 1) {
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

updatePerson :
mutation {
  updatePerson(
    id: 1,
    PersonInput: {
      lastName: "Richet"
      firstName: "Max"
      email: "maxrichet78@gmail.com"
      phoneNumber: "0625683374"
    }
  ) {
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

removePerson :
mutation {
  removePerson(id: 1001)
}
```

### Animal

```
createAnimal :
mutation {
  createAnimal(
    AnimalInput: {
      name: "Test"
      dateOfBirth: "2002-03-27"
    	species: "Cat"
    	breed: "Test"
    	color: "Blue"
    	weight: 40000
    	ownerId: 1
    }
  ) {
    id
    name
    dateOfBirth
    species
    breed
    color
    weight
    ownerId
  }
}

findAllAnimal :
query{
  findAllAnimal {
    id
    name
    dateOfBirth
    species
    breed
    color
    weight
    ownerId
  }
}

findAnimalById :
query {
  findAnimalById(id: 1001) {
   id
    name
    dateOfBirth
    species
    breed
    color
    weight
    ownerId
  }
}

updateAnimal :
mutation {
  updateAnimal(
    id: 1001,
    AnimalInput: {
      name: "Testchanged"
      dateOfBirth: "2002-03-27"
    	species: "Cat"
    	breed: "Testchanged"
    	color: "Blue"
    	weight: 40000
    	ownerId: 1
    }
  ) {
    id
    name
    dateOfBirth
    species
    breed
    color
    weight
    ownerId
  }
}

removeAnimal :
mutation {
  removeAnimal(id: 1001)
}

findAnimalsByOwnerId :
query {
  findAnimalsByOwnerId(ownerId: 268) {
    id
    name
    species
    breed
  }
}
```

### Others query

```
find the oldest animal :
query{
  oldestAnimal {
    id
    name
    dateOfBirth
    species
    breed
    color
    weight
    ownerId
  }
}

find the most represented species :
query{
  getMostRepresentedSpecies
}

find the person who has the most animals :
query{
  personWithMostAnimals{
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

find the person who has the most cats :
query{
  personWithMostCats{
    id
    lastName
    firstName
    email
    phoneNumber
  }
}

who has the heaviest animal and what is his weight :
query{
  heaviestAnimal{
    name
    weight
  }
}

who has the heaviest group of animals and what his weight :
query{
  heaviestAnimalGroup {
    person {
      id
      firstName
      lastName
      email
      phoneNumber
    }
    totalWeight
  }
}
```

## Réponses aux questions :

```
Quel animal est le plus vieux ? 

"oldestAnimal": {
      "id": 934,
      "name": "Rocky",
      "dateOfBirth": "2009-09-21",
      "species": "Rabbit",
      "breed": "Flemish Giant",
      "color": "Gray",
      "weight": "31879"
}

Quelle espèce est la mieux représentée ? (Le plus d’entité de cette espèce) 

"getMostRepresentedSpecies": "L'espèce la plus représentée est Bird avec 179 animaux."

Quelle personne possède le plus d’animaux ? 

"personWithMostAnimals": {
      "id": 268,
      "firstName": "Sarah",
      "lastName": "White",
      "email": "sarah.white268@example.com",
      "phoneNumber": "555-0295"
}

Quelle personne possède le plus de chats ? 

"personWithMostCats": {
      "id": 268,
      "firstName": "Sarah",
      "lastName": "White",
      "email": "sarah.white268@example.com",
      "phoneNumber": "555-0295"
}

Qui possède l’animal le plus lourd ? Comment s’appelle cet animal et quel est son poids ? 

"heaviestAnimal": {
      "name": "Chloe",
      "weight": 49937
}

Qui possède le groupe d’animaux le plus lourd ? Quel est le poids total de ce groupe d’animaux ? 

"heaviestAnimalGroup": {
      "person": {
        "id": 18,
        "firstName": "Sophia",
        "lastName": "Brown",
        "email": "sophia.brown18@example.com",
        "phoneNumber": "555-0943"
      },
      "totalWeight": 172152
}
```

Axes d'améliorations :

- Travailler plus le design

- Revenir sur le bonne endroit dans la liste après avoir vu le détail d'une personne ou d'un animal

- Mettre les data de connexion à la bdd dans un .env qui n'est pas push sur Github

- Séparer mes éléments front en plus de composants