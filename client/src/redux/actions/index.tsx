import { FOUND_PETS, ADOPTION_PETS, LOST_PETS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES} from '../types/actionTypes';
import { FiltersActionTypes} from '../types/actionTypes'

export const foundPets = function(filter: string){
    return{
      type:FOUND_PETS,
      payload: filter
    }
}

export const adoptionPets = function(filter: string){
    return{
      type:ADOPTION_PETS,
      payload:filter
    }
}

export const lostPets = function(filter: string){
    return {
      type:LOST_PETS,
      payload:filter
    }
}

export const newerPosts = function(filter: string){
    return{
      type:NEWER_POSTS,
      payload:filter
    }
}

export const olderPosts = function(filter: string){
    return{
      type:OLDER_POSTS,
      payload:filter
    }
}

export const getTypes = function(filter: string){
    return {
      type:GET_TYPES,
      payload:filter
    }
}

export const getGenres = function(filter: string){
    return {
      type:GET_GENRES,
      payload:filter
    }
}