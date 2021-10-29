import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom";
import { getPosts } from "../redux/actions";
import {typeState} from '../redux/reducers/index'
// import Post from "./Post";
import styles from "../CSS/Feed.module.css"
import Filters from './Filters';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Feed(){

    const dispatch = useDispatch();
    let allPosts = useSelector((state: typeState) => (state.filteredPosts))
    console.log(allPosts)

    useEffect(()=>{
            dispatch(getPosts());
        }, [dispatch]);
        console.log(allPosts)
    if(allPosts.length){
        return(
            <div className = {styles.contenedor}>
                <Filters/>
                <div>
                <ImageList className={styles.taka}>
                {allPosts.map((item) => {console.log(item)
                return(
                    <ImageListItem key={item.state}>
                    <img
                        src={`http://localhost:3001/${item.petImage}`}
                        srcSet={`http://localhost:3001/${item.petImage}`}
                        alt={item.description}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.date}
                        subtitle={<span>genre: {item.genre}</span>}
                        position="below"
                    />
                    </ImageListItem>
                )})}
                </ImageList>
                    {/* {
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
                    } */}
                </div>
            </div>
        )
    }else{
        return <h1>Cargando...</h1>
    }
}