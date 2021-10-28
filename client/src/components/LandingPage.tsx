import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/actions";
import Title from "./Title/Title";

export default function LandingPage(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);

    return(
        <div>
            <Link to ={"/home"}><button>HOME</button></Link>
            <Title />
        </div>
    )
}