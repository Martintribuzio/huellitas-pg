import { useDispatch } from "react-redux"
import { filterByState, filterByLatest, getTypes, getGenres } from "../redux/actions"
import { ChangeEvent } from "react"

export default function Filters(){
    const dispatch = useDispatch()

    function handleSelectEstado(e: ChangeEvent<HTMLSelectElement>){
      console.log(e.target.value)
      dispatch(filterByState(e.target.value))
    }

    function handleSelectType(e: ChangeEvent<HTMLSelectElement>){
        console.log(e.target.value)
        dispatch(getTypes(e.target.value))
    }

    function handleSelectGenres(e: ChangeEvent<HTMLSelectElement>){
        console.log(e.target.value)
        dispatch(getGenres(e.target.value))
    }
    
   function handleClick(value: string){
     console.log(value)
     dispatch(filterByLatest(value))
   }

   return(
     <div>
         <select defaultValue='seleccione estado' onChange={(e) => handleSelectEstado(e)}>
            <option value='seleccione estado' disabled>seleccione estado</option>
            <option value='Perdido'>Perdido</option>
            <option value='Encontrado'>Encontrado</option>
            <option value='En adopcion'>En adopcion</option>
         </select>
         <select defaultValue='seleccione especie' onChange={(e) => handleSelectType(e)}>
            <option value='seleccione especie' disabled>seleccione especie</option>
            <option value='Perro'>Perro</option>
            <option value='Gato'>Gato</option>
            <option value='otros'>otros</option>
         </select>
         <select defaultValue='seleccione genero' onChange={(e) => handleSelectGenres(e)}>
            <option value='seleccione genero' disabled>seleccione genero</option>
            <option value='masculino'>masculino</option>
            <option value='femenino'>femenino</option>
         </select>
         <button value='mas recientes' onClick={() => handleClick('mas recientes')}>mas recientes</button>
         <button value='mas antiguos' onClick={() => handleClick('mas antiguos')}>mas antiguos</button>
     </div>
   )
}