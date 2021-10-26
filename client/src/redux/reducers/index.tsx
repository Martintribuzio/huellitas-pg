import { FOUND_PETS, ADOPTION_PETS, LOST_PETS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES} from '../types/actionTypes';
import { FiltersActionTypes } from '../types/actionTypes'
import {Pet} from '../types/types'

interface typeState{
  allPets: Array<Pet>,
  filteredPets: Array<Pet>,
  typesOfAnimals: Array<string>,
  genres: Array<string>,
}

const initialState: typeState = {
  allPets:[{img: '', description: '', date: '', state: 'lost', type: 'cat'}],
  filteredPets: [{img: '', description: '', date: '', state: 'lost', type: 'cat'}],
  typesOfAnimals: ['dog, cat'],
  genres: ['male, female']
}


export default function rootReducer (state = initialState, action:FiltersActionTypes) {
  switch(action.type){
    default:
      return state;
  }
}