import {RECEIVE_DECKS,ADD_DECK,ADD_CARD} from '../actions'

export default function questions(state={},action){
    switch(action.type){
        case RECEIVE_DECKS:
            debugger;
          return {
              ...state,
              ...action.decks
          }
        case ADD_DECK:
          debugger;
           return {
                ...state,
                [action.title]: {
                       title:action.title,
                       questions:[]
                     }
           }
        case ADD_CARD:
           debugger
           const card={question:action.question,answer:action.answer}
           return{
            ...state,   
            [action.id]: {
              ...state[action.id],
              questions:state[action.id].questions.concat([card])
              }
            }
        default:
           return state  
    }
}

