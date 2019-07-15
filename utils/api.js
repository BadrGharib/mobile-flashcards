import { AsyncStorage } from 'react-native'
//import { formatCalendarResults, CALENDAR_STORAGE_KEY } from './_calendar'
export const FLASHCARD_STORAGE_KEY = 'FlashCard:Deck'

export function getDecks () {
  debugger;
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results)=>{
        if(results !== null){
            const decks = JSON.parse(results)
            return decks;
        } 
        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(DecksData))
        return DecksData;
    })
}

export function getDeck (id) {
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
     // data[key] = undefined
      return data[id]
    //  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify({
        [title]: {
            title:title,
            questions:[]
        }
      }))
}
export function addCardToDeck (title , question, answer) {
  debugger;
    return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
     // data[key] = undefined
     // delete data[key]
     const card={
       question:question,
       answer:answer
     }
     const newData={
      ...data,   
      [title]: {
        ...data[title],
        questions:data[title].questions.concat([card])
        }
      } 
      //...data[title].questions.concat([card])
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(newData))
    })
  }
  const DecksData={
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }