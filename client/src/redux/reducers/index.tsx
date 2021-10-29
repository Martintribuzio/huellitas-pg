 import { FILTER_STATE, FILTER_LATEST, GET_TYPES, GET_GENRES, POST_PET, GET_POSTS, GET_DETAIL} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {PostType} from '../types/types'

export interface typeState{
  allPosts: Array<PostType>,
  filteredPosts: Array<PostType>,
  PostDetail:PostType
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
  PostDetail:{
    description:'',
    genre:'',
    date:'',
    petImage:'',
    animal:'',
    postType:''
  }
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    case GET_POSTS:
        return{
            filteredPosts: action.payload,
            allPosts: action.payload
        }
    case GET_DETAIL:
        return{
            ...state,
            PostDetail: action.payload
        }
    case POST_PET:
        return{
            filteredPosts: action.payload,
            allPosts: action.payload
        }
    case FILTER_STATE:
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.postType === action.payload)
        }
    case FILTER_LATEST:
        return{
            ...state,
            filteredPosts:[...state.allPosts].sort((a:PostType,b:PostType) => {
                return a.date > b.date ? 1 : -1
            })
        }
    case GET_TYPES: 
        return{
            ...state,
            filteredPosts: state.allPosts.filter(p => p.animal === action.payload)
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