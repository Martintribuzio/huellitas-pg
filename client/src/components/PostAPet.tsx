import React from "react";
import {ChangeEvent, useState} from "react";
import styles from "./PostAPet.module.css"
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
        genre:''
    })

    function handleChange(e: htmlTypes){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // console.log(input)

    type htmlTypes = ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>;

    function handleSubmit(e:any){
        e.preventDefault();
        dispatch(postPet(input))
        alert('Publicado!')
    }

    return(
        <div className = {styles.conteiner}>
            <form className = {styles.form} onSubmit = {handleSubmit}>
                
                <label>Estado: </label>
                <select name='state' defaultValue = "Tipo" onChange = {(e)=>handleChange(e)}>
                    <option value="lost">Perdido</option>
                    <option value="adoption">En adopcion</option>
                    <option value="found">Encontrado</option>
                </select>
                 
                <label>Tipo de animal: </label>
                <select defaultValue = "Tipo" onChange = {(e)=>handleChange(e)}>
                    <option>Perro</option>
                    <option>Gato</option>
                    <option>Otros</option>
                </select>
                
                <label>Genero </label>
                <select defaultValue = "Genero" onChange = {(e)=>handleChange(e)}>
                    <option>Masculino</option>
                    <option>Femenino</option>
                </select>

                <label>Imagen: </label>
                <input onChange = {(e)=>handleChange(e)}></input>

                <label>Fecha: </label>
                <input type = "date" onChange = {(e)=>handleChange(e)}></input>

                <label>Descripcion: </label>
                <textarea onChange = {(e)=>handleChange(e)}></textarea>
                
                <button>Publicar</button>
            </form>
        </div>
    )
}
