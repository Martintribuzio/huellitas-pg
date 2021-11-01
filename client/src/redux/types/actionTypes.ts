<<<<<<< HEAD
import { PostType } from './types';

export const FILTER_STATE = 'FILTER_STATE';
export const FILTER_LATEST = 'FILTER_LATEST';
export const GET_TYPES = 'GET_TYPES';
export const GET_GENRES = 'GET_GENRES';
export const GET_POSTS = 'GET_POSTS';
export const POST_PET = 'POST_PET';
export const GET_DETAIL = 'GET_DETAIL';
export const SET_USER = 'SET_USER';

export interface getDetail {
  type: typeof GET_DETAIL;
  payload: PostType;
}
=======
import {PostType} from "./types"

export const FILTER_STATE = "FILTER_STATE";
export const FILTER_LATEST = "FILTER_LATEST";
export const GET_TYPES = "GET_TYPES";
export const GET_GENRES = "GET_GENRES"
export const GET_POSTS = "GET_POSTS";
export const POST_PET = "POST_PET";
export const GET_DETAIL = "GET_DETAIL";
export const GET_POST_QUERY = "GET_POST_QUERY";
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0

export interface getPosts {
  type: typeof GET_POSTS;
  payload: Array<PostType>;
}

<<<<<<< HEAD
export interface PostPet {
  type: typeof POST_PET;
  payload: Array<PostType>;
=======
export interface getPostQuery{
    type: typeof GET_POST_QUERY,
    payload: string
}

export interface getPosts{
    type: typeof GET_POSTS,
    payload:Array<PostType>
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
}

export interface filterByState {
  type: typeof FILTER_STATE;
  payload: string;
}

export interface filterByLatest {
  type: typeof FILTER_LATEST;
  payload: string;
}

export interface getTypes {
  type: typeof GET_TYPES;
  payload: string;
}

export interface getGenres {
  type: typeof GET_GENRES;
  payload: string;
}

export interface setUser {
  type: typeof SET_USER;
  payload: string;
}

<<<<<<< HEAD
export type FiltersActionTypes =
  | filterByState
  | filterByLatest
  | getTypes
  | getGenres
  | PostPet
  | getPosts
  | getDetail
  | setUser;
=======
export type FiltersActionTypes = filterByState | filterByLatest | getTypes | getGenres | PostPet | getPosts | getDetail | getPostQuery
>>>>>>> fd16b53a2347ef62b801f29f8f1194bf1cd428a0
