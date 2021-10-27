import { FOUND_POSTS, ADOPTION_POSTS, LOST_POSTS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {Post} from '../types/types'

interface typeState{
  allPosts: Array<Post>,
  filteredPosts: Array<Post>,
}

const initialState: typeState = {
  allPosts:[{img: '', description: '', date: '', state: 'lost', type: 'cat', genre:'male'}],
  filteredPosts: [{img: '', description: '', date: '', state: 'lost', type: 'cat', genre:'male'}],
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    case FOUND_POSTS:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.state === action.payload)
        }
    case ADOPTION_POSTS:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.state === action.payload)
        }
    case LOST_POSTS:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.state === action.payload)
        }
    case NEWER_POSTS:
        return{
            ...state,
            filteredPosts:[...state.allPosts].sort((a:Post,b:Post) => {
                return a.date.toLowerCase() > b.date.toLowerCase() ? 1 : -1
            })
        }
    case OLDER_POSTS:
        return{
            ...state,
            filteredPosts:[...state.allPosts].sort((a:Post,b:Post) => {
                return a.date.toLowerCase() < b.date.toLowerCase() ? 1 : -1
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