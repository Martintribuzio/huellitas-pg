 import { FILTER_STATE, FILTER_LATEST, GET_TYPES, GET_GENRES, POST_PET, GET_POSTS} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {PostType} from '../types/types'

export interface typeState{
  allPosts: Array<PostType>,
  filteredStatePosts: Array<PostType>,
  filteredTypePosts: Array<PostType>,
  filteredGenrePosts: Array<PostType>,
  showPosts: Array<PostType>
}

const initialState: typeState = {
  allPosts: [],
  filteredStatePosts: [],
  filteredTypePosts: [],
  filteredGenrePosts: [],
  showPosts: []
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    case GET_POSTS:
        return{
            ...state,
            showPosts: action.payload,
            allPosts: action.payload 
        }
    case POST_PET:
        return{
            showPosts: action.payload,
            allPosts: action.payload
        }
    case FILTER_STATE:
        if(action.payload === 'Todos'){
            return{
                ...state,
                showPosts: state.allPosts
            }
        }
        else{
            return{
                ...state,
                filteredStatePosts: state.allPosts.filter(p => p.state === action.payload),
                showPosts: state.showPosts.concat(state.filteredStatePosts)
            }
        }
    case FILTER_LATEST:
        if(action.payload === "mas recientes"){
        return{
            ...state,
            showPosts:[...state.showPosts].sort((a:PostType,b:PostType) => {
                return a.date < b.date ? 1 : -1
            })
        }
        }else{
            return{
                ...state,
                showPosts:[...state.showPosts].sort((a:PostType,b:PostType) => {
                    return a.date > b.date ? 1 : -1
                })
            }
        }
    case GET_TYPES: 
    if(action.payload === 'Todos'){
        return{
            ...state,
            showPosts: state.allPosts
        }
    }
    else{
    return{
        ...state,
        filteredTypePosts: state.allPosts.filter((p => p.type === action.payload)),
        showPosts: state.showPosts.concat(state.filteredStatePosts)
    }
}
    case GET_GENRES: 
    if(action.payload === 'Todos'){
        return{
            ...state,
            showPosts: state.allPosts
        }
    }
    else{
        return{
            ...state,
            filteredGenrePosts: state.allPosts.filter((p => p.genre === action.payload)),
            showPosts: state.showPosts.concat(state.filteredGenrePosts)
        }
    }
    default:
      return state;
  }
}