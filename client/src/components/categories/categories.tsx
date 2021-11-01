import {Link} from "react-router-dom"

export default function categories(){
    return(
        <div>
            <Link to='/pets/lost'>
                <img src='' alt='Perdidos'/>
                <p>Perdidos</p>
            </Link>
            <Link to='/pets/adoption'>
                <img src='' alt='Adopcion'/>
                <p>En adopción</p>
            </Link>
            <Link to='/pets/found'>
                <img src='' alt='Encontrados'/>
                <p>Encontrados</p>
            </Link>
        </div>
    )
}