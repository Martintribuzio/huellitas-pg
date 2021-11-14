import {
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  GET_POSTS,
  GET_DETAIL,
  GET_POST_QUERY,
  APPLY_FILTERS,
  GET_CONVERSATIONS,
  GET_COORDENADAS,
  GET_USER_ID,

  // EDIT_POST,
  DELETE_POST,
} from '../types/actionTypes';
import axios from 'axios';
import { Filters } from '../types/types';
import dotenv from 'dotenv';
dotenv.config();

export function getUser(id: string) {
  return async (dispatch: any) => {
    let data = (await axios.get('/user?id=' + id)).data;
    console.log('data');
    return dispatch({
      type: GET_USER_ID,
      payload: data,
    });
  };
}

export function deletePost(id: string | undefined) {
  return async (dispatch: any) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/posts/${id}`
      );
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getPosts() {
  return async function (dispatch: any) {
    let data = (await axios.get('/post')).data;
    return dispatch({ type: GET_POSTS, payload: data });
  };
}

export function getPostDetail(id: String) {
  return async function (dispatch: any) {
    let data = (await axios.get('/post?id=' + id)).data;
    return dispatch({ type: GET_DETAIL, payload: data });
  };
}
export function getConvers(ida: string) {
  return async function (dispatch: any) {
    let data = (await axios.get(`/conversation?ida=${ida}`)).data;
    return dispatch({ type: GET_CONVERSATIONS, payload: data });
  };
}

export function getCoords(lat: string, long: string) {
  return { type: GET_COORDENADAS, payload: { lat, long } };
}

export const filterByState = function (filter: string) {
  return {
    type: FILTER_STATE,
    payload: filter,
  };
};

export const getPostByQuery = function (query: string) {
  return {
    type: GET_POST_QUERY,
    payload: query,
  };
};

export const filterByLatest = function (filter: string) {
  return {
    type: FILTER_LATEST,
    payload: filter,
  };
};

export const getGenres = function (filter: string) {
  return {
    type: GET_GENRES,
    payload: filter,
  };
};

export const getTypes = function (filter: string) {
  return {
    type: GET_TYPES,
    payload: filter,
  };
};

export const sendFilters = function (filters: Filters) {
  return {
    type: APPLY_FILTERS,
    payload: filters,
  };
};

export const setUser = function (user: string) {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

// export const editPostReducer = function(b: boolean){
//   return {
//     type: EDIT_POST,
//     payload: b
//   }
// }
