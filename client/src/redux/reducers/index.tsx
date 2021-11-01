import {
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  POST_PET,
  GET_POSTS,
<<<<<<< HEAD
  GET_DETAIL,
  SET_USER,
=======
  GET_POST_QUERY,
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes';
import { PostType } from '../types/types';

export interface typeState {
  allPosts: Array<PostType>;
  filteredPosts: Array<PostType>;
<<<<<<< HEAD
  user: Object;
=======
  queryPosts: string;
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
}

const initialState: typeState = {
  allPosts: [],
  filteredPosts: [],
<<<<<<< HEAD
  user: {},
=======
  queryPosts: '',
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
};

export default function rootReducer(
  state = initialState,
  action: FiltersActionTypes
) {
  switch (action.type) {
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
<<<<<<< HEAD
=======
    case GET_POST_QUERY:
      return {
        ...state,
        queryPosts: action.payload,
      };
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
    case FILTER_STATE:
      return {
        ...state,
        filteredPosts: state.allPosts.filter(p => p.state === action.payload),
      };
    case FILTER_LATEST:
      return {
        ...state,
        filteredPosts: [...state.allPosts].sort((a: PostType, b: PostType) => {
          return action.payload === 'mas recientes'
            ? +new Date(b.date) - +new Date(a.date)
            : +new Date(a.date) - +new Date(b.date);
        }),
      };
    case GET_TYPES:
      return {
        ...state,
        filteredPosts: state.allPosts.filter(p => p.type === action.payload),
      };
    case GET_GENRES:
      return {
        ...state,
        filteredPosts: state.allPosts.filter(p => p.genre === action.payload),
      };
<<<<<<< HEAD
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
=======
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
    default:
      return state;
  }
}
