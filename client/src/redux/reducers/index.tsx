import {
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  POST_PET,
  GET_POSTS,
  GET_POST_QUERY,
  APPLY_FILTERS,
  SET_USER
} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes';
import { PostType } from '../types/types';

export interface typeState {
  allPosts: Array<PostType>;
  filteredPosts: Array<PostType>;
  queryPosts: string;
  user: Object;
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
  user: {},
  queryPosts: '',
};

function filtradosFunc(arr:Array<PostType> , state: string, type: string, genre: string){
  let result:Array<PostType> =  arr.filter(p => p.state === state).concat(arr.filter(p => p.type === type).concat(arr.filter(p => p.genre === genre)))
  return result
}

export default function rootReducer(
  state = initialState,
  action: FiltersActionTypes
) {
  switch (action.type) {
    case GET_POST_QUERY:
      return {
        ...state,
        queryPosts: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        filteredPosts: action.payload,
        allPosts: action.payload,
      };
    case POST_PET:
      return {
        ...state,
        filteredPosts: action.payload,
        allPosts: action.payload,
      };
    case FILTER_STATE:
      if (action.payload === 'Todos') {
        return {
          ...state,
          filteredPosts: state.allPosts,
        };
      } else {
        return {
          ...state,
          filteredPosts: state.allPosts.filter(p => p.state === action.payload),
        };
      }
    case FILTER_LATEST:
      return {
        ...state,
        filteredPosts: [...state.filteredPosts].sort(
          (a: PostType, b: PostType) => {
            return action.payload === 'mas antiguos'
              ? +new Date(b.date) - +new Date(a.date)
              : +new Date(a.date) - +new Date(b.date);
          }
        ),
      };
    case GET_TYPES:
      if(action.payload === 'Todos'){
        return{
            ...state,
            filteredPosts: state.allPosts
        }
    }
      return {
        ...state,
        filteredPosts: state.allPosts.filter(p => p.type === action.payload)
      };
    case GET_GENRES:
      if(action.payload === 'Todos'){
        return{
            ...state,
            filteredPosts: state.allPosts
        }
    }
      return {
        ...state,
        filteredPosts: state.allPosts.filter(p => p.genre === action.payload)
      };
    // case APPLY_FILTERS:
    //   if(action.payload.state === 'Todos' || action.payload.type === 'Todos' || action.payload.genre === 'Todos'){
    //     return{
    //         ...state,
    //         filteredPosts: state.allPosts
    //     }
    // }
    //   return{
    //     ...state,
    //     filteredPosts: filtradosFunc(state.allPosts, action.payload.state, action.payload.type, action.payload.genre)
    //   }
    default:
      return state;
  }
}
