import {
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  GET_POSTS,
  GET_POST_QUERY,
  GET_CONVERSATIONS,
  GET_COORDENADAS,
  GET_CONVMEMBERS,
} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes';
import { PostType, conversation,ConvMembers } from '../types/types';

export interface typeState {
  allPosts: Array<PostType>;
  filteredPosts: Array<PostType>;
  queryPosts: string;
  user: Object;
  conversations: Array<conversation>;
  coordenadas: { long: string; lat: string };
  convMembers:Array<ConvMembers>;
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
  user: {},
  queryPosts: '',
  conversations: [],
  coordenadas: { lat: '', long: '' },
  convMembers: [],
};

export default function rootReducer(
  state = initialState,
  action: FiltersActionTypes
) {
  console.log(action.payload);
  switch (action.type) {

    case GET_CONVMEMBERS:
      // console.log(action.payload);
      return {
        ...state,
        convMembers:[...state.convMembers,action.payload],
      };
    case GET_POST_QUERY:
      return {
        ...state,
        queryPosts: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        filteredPosts: action.payload,
        allPosts: action.payload.reverse(),
      };
    case GET_COORDENADAS:
      return {
        ...state,
        coordenadas: action.payload,
      };
    // case POST_PET:
    //   return {
    //     ...state,
    //     filteredPosts: action.payload,
    //     allPosts: action.payload,
    //   };
    case FILTER_STATE:
      if (action.payload === 'Todos') {
        return {
          ...state,
          filteredPosts: state.allPosts,
        };
      } else {
        return {
          ...state,
          filteredPosts: state.allPosts
            .filter(p => p.state === action.payload)
            .reverse(),
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
      if (action.payload === 'Todos') {
        return {
          ...state,
          filteredPosts: state.allPosts,
        };
      }
      return {
        ...state,
        filteredPosts: state.allPosts
          .filter(p => p.type === action.payload)
          .reverse(),
      };
    case GET_GENRES:
      if (action.payload === 'Todos') {
        return {
          ...state,
          filteredPosts: state.allPosts,
        };
      }
      return {
        ...state,
        filteredPosts: state.allPosts
          .filter(p => p.genre === action.payload)
          .reverse(),
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
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
      };
      
    default:
      return state;
  }
}
