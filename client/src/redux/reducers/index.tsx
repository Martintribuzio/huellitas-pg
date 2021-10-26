import { FOUND_PETS, ADOPTION_PETS, LOST_PETS, NEWER_POSTS, OLDER_POSTS, GET_TYPES, GET_GENRES} from '../types';
import { Filters } from '../types/index'

interface typeState{
  allPets: Array<Object>,
  filteredPets: Array<Object>,
  typesOfAnimals: Array<string>,
  genres: Array<string>,
}

const initialState: typeState = {
  allPets:[{name:'Betsy',Description:'...'},{name:'carlos',Description:'...'}],
  filteredPets:[{name:'Betsy',Description:'...'}],
  typesOfAnimals:['dogs','cats'],
  genres:['male','female'],
}


export default function reducer (state = initialState, action:Filters) {
  switch(action.type){
    case LOST_PETS:
      return{
        ...state,
        filteredPets:action.payload
      }
  }
}