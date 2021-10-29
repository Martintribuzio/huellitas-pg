import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getPosts } from "../redux/actions";
import {typeState} from '../redux/reducers/index'
import Post from "./Post";
import styles from "../CSS/Feed.module.css"
import Filters from './Filters';

export default function Feed(){

    const dispatch = useDispatch();
    let allPosts = useSelector((state: typeState) => (state.filteredPosts))
    console.log(allPosts)

    useEffect(()=>{
            dispatch(getPosts());
        }, [dispatch]);

    if(allPosts.length){
        console.log(allPosts)
        return(
            <div className = {styles.contenedor}>
                <Filters/>
                <div>
                    {   
                        allPosts.map(p => {
                            
                            return(
                                <Link to = {'/home/detail/'} key = {p._id}>
                                    <Post
                                        petImage = {p.petImage}
                                        description = {p.description}
                                        date = {p.date}
                                        genre = {p.genre}
                                        type = {p.type}
                                        state = {p.state}
                                    />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        )
    }else{
        return <h1>Cargando...</h1>
    }
}