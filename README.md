# mobile-flashcards
mobile flashcards react native project

To get started right away:

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`
* Android emulator have been tested

## What You're Getting
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── actions #Contain all action that we will use to handel store data
│    ├── index.js # Deck actions.  
├── component
│    ├── AddCard.js # to add new card in specified deck
│    ├── AddDeck.js # to add new deck
│    ├── Deck.js # render deck ui title and cards count
│    ├── DeckDetails.js # render deck details and give option to add card or start quiz
│    ├── DeckList.js # render list contain all decks
│    ├── Quiz.js # to take quiz for specified dec and get quiz score.
├── reducers #contain all info that will saved in ths store.
│    ├── index.js # contain decks information.
├── utils 
│    ├── api.js # act as backend to access the local storage
│    ├── colors.js # contain defined colors
│    └── helpers.js # contain helper methods like handel notification
|
├── App.js # the container component and has tabs configuration
├── App.json # contain configuration to build ios and android files
```

## Notification

The user receive notification every day at 8 pm if he didn't complete at lest one quiz.

## Data

There are one type of objects stored in our database:

* Decks

### Decks

Decks include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| title                 | String           | The decks’s unique identifier |
| questions          | Array           | list of question (question,answer)    |


Your code will talk to the database (local storage) via 3 methods used by api:

* `getDecks()`
* `saveDeckTitle()`
* `addCardToDeck(question)`



