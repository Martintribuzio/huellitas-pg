import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getPosts } from "../redux/actions";
import {typeState} from '../redux/reducers/index'
// import Post from "./Post";
import styles from "../CSS/Feed.module.css"
import Filters from './Filters';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Box from '@mui/material/Box';
import { Button, Stack } from "@mui/material";
import { PostType } from "../redux/types/types";

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
                <Box className={styles.box} sx={{display:{xs:'none',sm:'none',md:'flex'}}}>
                <ImageList cols={3} className={styles.taka}>
                {allPosts.map((item) => 
                (
                    <ImageListItem key={item._id}>
                    <img
                        src={`http://localhost:3001/${item.petImage}`}
                        srcSet={`http://localhost:3001/${item.petImage}`}
                        alt={item.description}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.type}
                        subtitle={item.date}
                    />
                        <Stack direction="row" justifyContent="flex-end" textAlign='center'>
                            <Button href={`http://localhost:3000/home/detail/+${item._id}`}>Detalles</Button>
                        </Stack>
                    </ImageListItem>
                )
                )}
                </ImageList>
                </Box>
                <Box sx={{display:{xs:'none',sm:'flex',md:'none'}}}>
                <ImageList cols={2} className={styles.taka}>
                {allPosts.map((item) => 
                (
                    <ImageListItem key={item._id}>
                    <img
                        src={`http://localhost:3001/${item.petImage}?w=248&fit=crop&auto=format`}
                        srcSet={`http://localhost:3001/${item.petImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.description}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.type}
                        subtitle={item.date}
                    />
                    </ImageListItem>
                )
                )}
                </ImageList>
                </Box>
                <Box sx={{display:{xs:'flex',sm:'none',md:'none'}}}>
                <ImageList cols={1} className={styles.taka}>
                {allPosts.map((item) => 
                (
                    <ImageListItem key={item._id}>
                    <img
                        src={`http://localhost:3001/${item.petImage}`}
                        srcSet={`http://localhost:3001/${item.petImage}`}
                        alt={item.description}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.type}
                        subtitle={item.date}
                    />
                    </ImageListItem>
                )
                )}
                </ImageList>
                </Box>
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