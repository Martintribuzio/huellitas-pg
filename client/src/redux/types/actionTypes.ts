import {Post} from './types'

export const FOUND_POSTS = "FOUND_POSTS";
export const ADOPTION_POSTS = "ADOPTION_POSTS";
export const LOST_POSTS = "LOST_POSTS";
export const NEWER_POSTS = "NEWER_POSTS";
export const OLDER_POSTS = "OLDER_POSTS";
export const GET_TYPES = "GET_TYPES";
export const GET_GENRES = "GET_GENRES"
export const GET_POSTS = "GET_POSTS";
export const POST_PET = "POST_PET"

export interface getPosts{
    type: typeof GET_POSTS,
    payload:Array<Post>
}

export interface PostPet{
    type: typeof POST_PET,
    payload:Array<Post>
}

export interface foundPosts{
    type: typeof FOUND_POSTS,
    payload:string
}

export interface adoptionPosts{
    type: typeof ADOPTION_POSTS,
    payload:string
}

export interface lostPosts{
    type: typeof LOST_POSTS,
    payload:string
}

export interface newerPosts{
    type: typeof NEWER_POSTS,
    payload:string
}

export interface olderPosts{
    type: typeof OLDER_POSTS,
    payload:string
}

export interface getTypes{
    type: typeof GET_TYPES,
    payload:string
}

export interface getGenres{
    type: typeof GET_GENRES,
    payload: string
}

export type FiltersActionTypes = foundPosts | adoptionPosts | lostPosts | newerPosts | olderPosts | getTypes | getGenres