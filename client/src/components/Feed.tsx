import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getPosts } from "../redux/actions";
import {typeState} from '../redux/reducers/index'
import Post from "./Post";
import styles from "../CSS/Feed.module.css"
import Filters from './Filters';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import s from './Feed.module.css'

export default function Feed(){

    const dispatch = useDispatch();
    let allPosts = useSelector((state: typeState) => (state.filteredPosts))
    console.log(allPosts)

    useEffect(()=>{
            dispatch(getPosts());
        }, [dispatch]);

    if(allPosts.length){
        return(
            <div className = {styles.contenedor}>
                <Filters/>
                <div>

                <ImageList className={s.taka}>
      {allPosts.map((item) => (
        <ImageListItem key={item.description}>
          <img
            src={`http://localhost:3001/${item.petImage}?w=248&fit=crop&auto=format&dpr=2`}
            srcSet={`http://localhost:3001/${item.petImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.animal}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.animal}
            subtitle={<span>by: {item.genre}</span>}
            position="below"
          />
        </ImageListItem>
      ))}
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
                                        animal = {p.animal}
                                        postType = {p.postType}
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