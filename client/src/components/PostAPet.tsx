import React from "react";
import {ChangeEvent, useState} from "react";
import styles from "./PostAPet.module.css"
import { useDispatch} from "react-redux";

export default function PostAPet() { 
    //const dispatch =  useDispatch();

    interface Input{
        state:string,
        img: string,
        description: string
    }

    const [input, setInput] = useState<Input>({
        state: '',
        img: '',
        description: ''
    })

    function handleChange(e: ChangeEvent<HTMLFormElement>){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e:any){
        e.preventDefault();
        // dispatch()
        alert('Publicado!')
    }

    return(
        <div className = {styles.conteiner}>
            <form className = {styles.form} onSubmit = {handleSubmit}>
                
                <label>Estado: </label>
                <select defaultValue = "Tipo" onChange = {()=>handleChange}>
                    <option>Perdido</option>
                    <option>En adopcion</option>
                    <option>Encontrado</option>
                </select>

                <label>Imagen: </label>
                <input onChange = {()=>handleChange}></input>

                <label>Fecha: </label>
                <input type = "date" onChange = {()=>handleChange}></input>

                <label>Descripcion: </label>
                <textarea onChange = {()=>handleChange}></textarea>

                <button>Publicar</button>
            </form>
        </div>
    )
}