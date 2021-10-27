import { FILTER_STATE, FILTER_LATEST, GET_TYPES, GET_GENRES} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {Post} from '../types/types'

interface typeState{
  allPosts: Array<Post>,
  filteredPosts: Array<Post>,
}

const initialState: typeState = {
  allPosts:[{img: '', description: '', date: '2019/05/21', state: 'lost', type: 'cat', genre:'male'},{img: '', description: '', date: '2015/04/12', state: 'lost', type: 'dog', genre:'female'}],
  filteredPosts: [{img: '', description: '', date: '2019/05/21', state: 'lost', type: 'cat', genre:'male'}],
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    case FILTER_STATE:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.state === action.payload)
        }
    case FILTER_LATEST:
        return{
            ...state,
            filteredPosts:[...state.allPosts].sort((a:Post,b:Post) => {
                return a.date > b.date ? 1 : -1
            })
        }
    case GET_TYPES:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.type === action.payload)
        }
    case GET_GENRES:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.genre === action.payload)
        }
    default:
      return state;
  }
}