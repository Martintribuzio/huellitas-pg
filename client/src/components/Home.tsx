import Feed from "./Feed"
import Filters from "./Filters"
import style from '../CSS/Home.module.css'

export default function Home(){
    return(
        <div className={style.div}>
            <Filters/>
            <Feed/>
        </div>
    )
}