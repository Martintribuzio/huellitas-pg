import { POST_PET, FOUND_POSTS, ADOPTION_POSTS, LOST_POSTS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES, GET_POSTS} from '../types/actionTypes';
import axios from 'axios'
import { Input } from '../types/types'

export const getPosts = function(){
    return{
      type:GET_POSTS,
      
    }
}

// export function postPet(input: Input){
//     return async function(dispatch){ HAY QUE ARREGLAR EL DISPATCH
//         let info = await axios.post('/post', input)
//         return dispatch({type:POST_PET, payload:info.data})
//     }
// }

export const foundPets = function(filter: string){
    return{
      type:FOUND_POSTS,
      payload: filter
    }
}

export const adoptionPets = function(filter: string){
    return{
      type:ADOPTION_POSTS,
      payload:filter
    }
}

export const lostPets = function(filter: string){
    return {
      type:LOST_POSTS,
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