import { FOUND_PETS, ADOPTION_PETS, LOST_PETS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES} from '../types';
import { Filters } from '../types/index'

export const foundPets = function(){
    return{
      type:FOUND_PETS,
      payload:''
    }
}

export const adoptionPets = function(){
    return{
      type:ADOPTION_PETS,
      payload:''
    }
}

export const lostPets = function(){
    return {
      type:LOST_PETS,
      payload:''
    }
}

export const newerPosts = function(){
    return{
      type:NEWER_POSTS,
      payload:''
    }
}

export const olderPosts = function(){
    return{
      type:OLDER_POSTS,
      payload:''
    }
}

export const getTypes = function(){
    return {
      type:GET_TYPES,
      payload:''
    }
}

export const getGenres = function(){
    return {
      type:GET_GENRES,
      payload:''
    }
}