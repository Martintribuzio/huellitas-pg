
import {ChangeEvent, useState} from "react";
import "../CSS/PostAPet.module.css"
import { useDispatch } from "react-redux";
import {Input} from '../redux/types/types'
import { postPet } from "../redux/actions";

export default function PostAPet() { 
    const dispatch =  useDispatch();

    const [input, setInput] = useState<Input>({
        state: '',
        img: '',
        description: '',
        type: '',
        genre:'',
        date:""
    })

    function handleChange(e: htmlTypes){
        // if(e.target.name === "img"){
        //     let file = (e.target as HTMLInputElement).files[0] || ""
        //     setInput({
        //         ...input,
        //         ['img']: file
        //     }) 
        // }else{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        // }
    }

    console.log(input);

    type htmlTypes = ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>;

    function handleSubmit(e:any){
        e.preventDefault();
        dispatch(postPet(input))
        alert('Publicado!')
    }

    return(
        <div className="conteiner">
            <form onSubmit = {handleSubmit}>
                
                <label>Estado: </label>
                <select name='state' defaultValue = "Estado de mascota" onChange = {(e)=>handleChange(e)}>
                    <option disabled>Estado de mascota</option>
                    <option value="lost">Perdido</option>
                    <option value="adoption">En adopcion</option>
                    <option value="found">Encontrado</option>
                </select>
                 
                <label>Tipo de animal: </label>
                <select name="type" defaultValue = "Tipo de mascota" onChange = {(e)=>handleChange(e)}>
                    <option disabled>Tipo de mascota</option>
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Otros</option>
                </select>
                
                <label>Genero </label>
                <select name="genre" defaultValue = "Genero de mascota" onChange = {(e)=>handleChange(e)}>
                    <option disabled>Genero de mascota</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <label>Imagen: </label>
                <input name ="img" type = "file" onChange = {(e)=>handleChange(e)}></input>

                <label>Fecha: </label>
                <input  name = "date" type = "date" onChange = {(e)=>handleChange(e)}></input>

                <label>Descripcion: </label>
                <textarea name="description" onChange = {(e)=>handleChange(e)}></textarea>
                
                <button>Publicar</button>
            </form>
        </div>
    )
}
