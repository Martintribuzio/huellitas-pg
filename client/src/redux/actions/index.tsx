import { POST_PET, FILTER_STATE, FILTER_LATEST, GET_TYPES, GET_GENRES, GET_POSTS} from '../types/actionTypes';
import axios from 'axios'
import { Input } from '../types/types'

export const getPosts = function(){
    return{
      type:GET_POSTS,
      
    }
}

export function postPet(input: Input){
    return async function(dispatch: any){ 
        console.log(input)
        let info = await axios.post('/post', input)
        return dispatch({type:POST_PET, payload:info.data})
    }
}

export const filterByState = function(filter: string){
    return{
      type:FILTER_STATE,
      payload: filter
    }
}

export const filterByLatest = function(filter: string){
    return{
      type:FILTER_LATEST,
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