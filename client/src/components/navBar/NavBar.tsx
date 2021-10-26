import React from "react";
import {Link} from "react-router-dom";
const styles = require("./NavBar.module.css"); 


export default function Navbar (): JSX.Element{

    return(
        <div className={styles.container} >
            <img src='' alt='tuki'/>
            <div>
                <Link to ="/home" >
                    <button className={styles.navButon}   >
                        home
                    </button>
                </Link>
                <Link to ='/pets'>
                    <button className={styles.navButon}>
                        Mascotas
                    </button>
                </Link>
                <Link to='/shelters'>
                    <button className={styles.navButon}>
                        Refugios
                    </button>
                </Link>
                <Link to='/contact'>
                    <button className={styles.navButon}>
                        Contacto
                    </button>
                </Link>
            </div>
            <Link to='/login'>
                <button className={styles.login}>
                    iniciar secion
                </button>
            </Link>
            
        </div>
    )

}