import {
  POST_PET,
  FILTER_STATE,
  FILTER_LATEST,
  GET_TYPES,
  GET_GENRES,
  GET_POSTS,
  GET_DETAIL,
<<<<<<< HEAD
=======
  GET_POST_QUERY,
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
} from '../types/actionTypes';
import axios from 'axios';

export function postPet(input: FormData) {
  return async function (dispatch: any) {
    //console.log(input)
    let info = await axios.post('http://localhost:3001/post', input, {
      method: 'post',
      url: 'http://localhost:3001/post',
      data: input,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return dispatch({ type: POST_PET, payload: info.data });
  };
}

export function getPosts() {
  return async function (dispatch: any) {
    let data = (await axios.get('http://localhost:3001/post')).data;
    // console.log(data)
    return dispatch({ type: GET_POSTS, payload: data });
  };
}

export function getPostDetail(id: String) {
  return async function (dispatch: any) {
    let data = (await axios.get('http://localhost:3001/post?id=' + id)).data;
    return dispatch({ type: GET_DETAIL, payload: data });
  };
}

export const filterByState = function (filter: string) {
  return {
    type: FILTER_STATE,
    payload: filter,
  };
};

<<<<<<< HEAD
export const filterByLatest = function (filter: string) {
  return {
    type: FILTER_LATEST,
    payload: filter,
  };
};

export const getTypes = function (filter: string) {
  return {
    type: GET_TYPES,
=======
export const getPostByQuery = function (query: string) {
  return {
    type: GET_POST_QUERY,
    payload: query,
  };
};

export const filterByLatest = function (filter: string) {
  return {
    type: FILTER_LATEST,
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
    payload: filter,
  };
};

<<<<<<< HEAD
export const getGenres = function (filter: string) {
  return {
    type: GET_GENRES,
=======
export const getTypes = function (filter: string) {
  return {
    type: GET_TYPES,
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
    payload: filter,
  };
};

<<<<<<< HEAD
export const setUser = function (user: string) {
  return {
    type: 'SET_USER',
    payload: user,
=======
export const getGenres = function (filter: string) {
  return {
    type: GET_GENRES,
    payload: filter,
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
  };
};
