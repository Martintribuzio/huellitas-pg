export const FOUND_PETS = "FOUND_PETS";
export const ADOPTION_PETS = "ADOPTION_PETS";
export const LOST_PETS = "LOST_PETS";
export const NEWER_POSTS = "NEWER_POSTS";
export const OLDER_POSTS = "OLDER_POSTS";
export const GET_TYPES = "GET_TYPES";
export const GET_GENRES = "GET_GENRES"

export interface foundPets{
    type: typeof FOUND_PETS,
    payload:Array<Object>
}

export interface adoptionPets{
    type: typeof ADOPTION_PETS,
    payload:Array<Object>
}

export interface lostPets{
    type: typeof LOST_PETS,
    payload:Array<Object>
}

export interface newerPosts{
    type: typeof NEWER_POSTS,
    payload: Array<Object>
}

export interface olderPosts{
    type: typeof OLDER_POSTS,
    payload: Array<Object>
}

export interface getTypes{
    type: typeof GET_TYPES,
    payload: Array<string>
}

export interface getGenres{
    type: typeof GET_GENRES,
    payload: Array<string>
}

export type Filters = foundPets | adoptionPets | lostPets | newerPosts | olderPosts | getTypes | getGenres