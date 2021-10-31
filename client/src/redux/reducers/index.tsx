import { FILTER_STATE, FILTER_LATEST, GET_TYPES, GET_GENRES, POST_PET, GET_POSTS, GET_POST_QUERY} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {PostType} from '../types/types'

export interface typeState{
  allPosts: Array<PostType>,
  filteredPosts: Array<PostType>,
  queryPosts: string
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
  queryPosts:''
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    case GET_POSTS:
        return{
            filteredPosts: action.payload,
            allPosts: action.payload
        }
    case POST_PET:
        return{
            filteredPosts: action.payload,
            allPosts: action.payload
        }
    case GET_POST_QUERY:
        return{
          ...state,
          queryPosts: action.payload
        }
    case FILTER_STATE:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.state === action.payload)
        }
    case FILTER_LATEST:
        return{
            ...state,
            filteredPosts:[...state.allPosts].sort((a:PostType,b:PostType) => {
                return action.payload === "mas recientes"
                ? + new Date(b.date) - + new Date(a.date)
                : + new Date(a.date) - + new Date(b.date)
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