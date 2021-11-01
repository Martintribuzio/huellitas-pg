
import {
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  POST_PET,
  GET_POSTS,
  GET_POST_QUERY,
} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes';
import { PostType } from '../types/types';

export interface typeState {
  allPosts: Array<PostType>;
  filteredPosts: Array<PostType>;
  queryPosts: string;
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
  queryPosts: '',
};


export default function rootReducer(
  state = initialState,
  action: FiltersActionTypes
) {
  switch (action.type) {
    case GET_POSTS:
        return{
            ...state,
            showPosts: action.payload,
            allPosts: action.payload 
        }
    case POST_PET:
        return{
            ...state,
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
                showPosts: state.allPosts.filter(p => p.state === action.payload),
            }
        }
    case FILTER_LATEST:
        if(action.payload === "mas antiguos"){
        return{
            ...state,
            showPosts:[...state.showPosts].sort((a:PostType,b:PostType) => {
                return action.payload === "mas antiguos"
                ? + new Date(b.date) - + new Date(a.date)
                : + new Date(a.date) - + new Date(b.date)
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
        showPosts: state.showPosts.filter((p => p.type === action.payload)),
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
            showPosts: state.showPosts.filter((p => p.genre === action.payload)),
        }
    }
    default:
      return state;
  }
}
