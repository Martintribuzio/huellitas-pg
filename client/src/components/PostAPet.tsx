
import {ChangeEvent, useState} from "react";
import "../CSS/PostAPet.module.css"
import { useDispatch } from "react-redux";
import {PostType} from '../redux/types/types'
import { postPet } from "../redux/actions";

export default function PostAPet() { 
    const dispatch =  useDispatch();

    const [input, setInput] = useState<PostType>({
        description: '',
        genre:'',
        date:"",
        petImage: null,
        type: "", 
        state: "" 
    })

    function handleChange(e: htmlTypes){
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
    }

    function handleChangeImg(e: ChangeEvent<HTMLInputElement>) {
        setInput({
            ...input,
            petImage: e.target.files?.item(0)
        })
    }

    //console.log(input);

    type htmlTypes = ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>;

    function handleSubmit(e:any){
        e.preventDefault();
        const fd = new FormData();
        if(input.petImage){
            fd.append('petImage', input.petImage)
        }
        fd.append('state', input.state)
        fd.append('description', input.description)
        fd.append('type', input.type)
        fd.append('genre', input.genre)
        dispatch(postPet(fd)) //mando form a trvaes del axios lol
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
                    <option value='male'>Macho</option>
                    <option value='female'> Hembra</option>
                </select>

                <label>Imagen: </label>
                <input name ="img" type = "file" onChange = {handleChangeImg}></input>

                <label>Fecha: </label>
                <input  name = "date" type = "date" onChange = {(e)=>handleChange(e)}></input>

                <label>Descripcion: </label>
                <textarea placeholder="Ingrese descripcion de su publicacion" name="description" onChange = {(e)=>handleChange(e)}></textarea>
                
                <button>Publicar</button>
            </form>
        </div>
    )
}
