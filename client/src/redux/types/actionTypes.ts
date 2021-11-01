import { PostType } from './types';

export const FILTER_STATE = 'FILTER_STATE';
export const FILTER_LATEST = 'FILTER_LATEST';
export const GET_TYPES = 'GET_TYPES';
export const GET_GENRES = 'GET_GENRES';
export const GET_POSTS = 'GET_POSTS';
export const POST_PET = 'POST_PET';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_POST_QUERY = 'GET_POST_QUERY';
export const APPLY_FILTERS = "APPLY_FILTERS";
export const SET_USER = 'SET_USER';
export const ERROR = 'ERROR';

export interface getPosts {
  type: typeof GET_POSTS;
  payload: Array<PostType>;
}

export interface PostPet {
  type: typeof POST_PET;
  payload: Array<PostType>;
}

export interface getPostQuery {
  type: typeof GET_POST_QUERY;
  payload: string;
}

export interface getDetail {
  type: typeof GET_DETAIL;
  payload: PostType;
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

export interface catchErrors{
    type: typeof ERROR,
    payload: any
}

export interface setUser {
  type: typeof SET_USER;
  payload: string;
}

export type FiltersActionTypes =
  | filterByState
  | filterByLatest
  | getTypes
  | getGenres
  | PostPet
  | getPosts
  | getDetail
  | setUser
  | getPostQuery
  | catchErrors;
