import Juan from './fotos/Juan.png';
import Cris from './fotos/Cris.jpg';
import Guada from './fotos/Guada.jpg';
import Justo from './fotos/Justo.jpg';
import Lucho from './fotos/Lucho.jpg';
import Martin from './fotos/Martoo.jpg';
import Benja from './fotos/Mono.jpg';
import Santi from './fotos/Santi.jpg';
import style from './about.module.css';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Github from '@mui/icons-material/GitHub';
import Email from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import { Fade } from 'react-awesome-reveal';
export default function About() {
    return(
        <div className={style.container}>
        <Typography variant="h3" gutterBottom 
        className={style.about}
        component='div' color='white'>
        Sobre Nosotros
        </Typography>
    <div className={style.cards}>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Cris'
              sx={{
                maxHeight: 300,
              }}
              image={Cris}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Cristian Wenz
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
      
        component='div'>
        <span>Alias:<i>"El padre de familia"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/cdwenz'target="_blank">
          <Github />
        </IconButton>
        <IconButton className={style.button} href='https://www.linkedin.com/in/cristian-wenz-dev?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BIRkFjvK5SMmwXWnch57FDw%3D%3D'target="_blank">
          <LinkedIn/>
          </IconButton>
          <IconButton className={style.button} href='mailto:cdwenz@gmail.com'target="_blank">
          <Email />
          </IconButton> 
          </div>
     </Typography>
      </CardContent>
    </Card>
    </Fade>
    
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Justo'
              sx={{
                minWidth: '20vw',
                maxHeight: 300,
              }}
              image={Justo}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>

        Justo Becerra
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
        component='div'>
          <span>Alias:<i>"Justiciero"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/JustBecerra'target="_blank">
          <Github />
        </IconButton> 
        <IconButton className={style.button} href='https://www.linkedin.com/in/justo-becerra-a8a8b817b/'target="_blank">
          <LinkedIn/>
        </IconButton>
        <IconButton className={style.button} href='mailto:justj.becerra@gmail.com'target="_blank">
          <Email />
        </IconButton>
          </div>
          </Typography>
      </CardContent>
    </Card>
    </Fade>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Lucho'
              sx={{
                maxHeight: 300,
              }}
              image={Lucho}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Luciano Bifaretti
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
     
        component='div'>
          <span>Alias: <i> "Lucho"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/luchobifa'target="_blank">
          <Github />
        </IconButton> 
        <IconButton className={style.button} href='https://www.linkedin.com/in/luciano-bifaretti/'target="_blank"> 
          <LinkedIn/>
        </IconButton>
        <IconButton className={style.button} href='mailto:lucianobifa@gmail.com'target="_blank">
          <Email />
          </IconButton>  
          </div>
          </Typography>
      </CardContent>
    </Card>
    </Fade>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Martín'
              sx={{
                maxHeight:300,
              }}
              image={Martin}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Martín Tribuzio
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
        
        component='div'>
        <span> Alias:<i>"Martoo"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/Martintribuzio'target="_blank">
          <Github />
        </IconButton>
        <IconButton className={style.button} href='https://www.linkedin.com/in/martintribuziodev?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B1B4eFPrLR%2BuKYZxBtQjeJA%3D%3D'target="_blank">
          <LinkedIn/>
        </IconButton> 
        <IconButton className={style.button} href='mailto:martinmozzt@pm.me'target="_blank">
          <Email />
         </IconButton>
          </div>
      </Typography>

      </CardContent>
    </Card>
    </Fade>
    
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Benja'
              sx={{
                maxHeight: 300,
              }}
              image={Benja}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Benjamín Aracil
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
        
        component='div'>
        <span>Alias:<i> "Mono"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/benjaaracil'target="_blank">
          <Github />
          </IconButton> 
          <IconButton className={style.button} href='https://www.linkedin.com/in/benjaminaracil?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6rNLh4c4TBqiEAdH%2FfY0%2BA%3D%3D'target="_blank">
          <LinkedIn/>
          </IconButton>
          <IconButton className={style.button} href='mailto:benjaminaracil@gmail.com'target="_blank">
          <Email />
          </IconButton>
          </div>
     </Typography>
      </CardContent>
    </Card>
    </Fade>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
    className={style.jurox}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia
              component='img'
              alt='Juan'
              sx={{
                maxHeight: 300,
              }}

              image={Juan}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Juan Dedossi
      </Typography>
              
        <Typography
        className={style.aliasJurox} 
        sx={{ textAlign: 'left' }}
        component='div'>
          
        <span>Alias:<i> "Jurox"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/JuanDedossi'target="_blank">
          <Github />
        </IconButton>
        <IconButton className={style.button} href='https://www.linkedin.com/in/juan-guillermo-dedossi-fullstack/'target="_blank">
          <LinkedIn/>
        </IconButton>
        <IconButton className={style.button} href='mailto: juandedossi@yahoo.com'target="_blank">
          <Email />
        </IconButton>
        </div>
      </Typography>
      </CardContent>
    </Card>
    </Fade>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Santi'
              sx={{
                maxHeight: 300,
              }}
              image={Santi}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Santiago Abregu
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
        
        
        component='div'>
          <span>Alias: <i> "El modelo"</i> </span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/santipk'target="_blank">
          <Github />
          </IconButton> 
          <IconButton className={style.button} href='https://www.linkedin.com/in/santipk?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B8kqusPkgSkKzBA2jtJSAfA%3D%3D'target="_blank">
          <LinkedIn/>
          </IconButton>
          <IconButton className={style.button} href='mailto:santieldk@gmail.com'target="_blank">
          <Email />
          </IconButton>
          </div>
       </Typography>
      </CardContent>
    </Card>
    </Fade>
    <Fade direction='up' triggerOnce className='Fade'>
    <Card elevation={5}
          sx={{
            maxWidth: 300,
            minWidth: '20vw',
            margin:2,
          }}>
              <CardMedia 
              component='img'
              alt='Guada'
              sx={{
                maxHeight: 300,
              }}
              image={Guada}/>
        <CardContent className={style.card}>
        <Typography
        className={style.name}
        sx={{ textAlign: 'left' }}
        gutterBottom
        variant='h5'
        component='div'>
        Guadalupe Cervera
      </Typography>
        <Typography
        className={style.alias}
        sx={{ textAlign: 'left' }}
        component='div'>
       <span>Alias: <i> "Guadinha"</i></span>
      </Typography>
      <Typography sx={{ textAlign: 'right' }}>
      <div className={style.icons} >
        <IconButton className={style.button} href='https://github.com/maria-guadalupe-cervera'target="_blank">
          <Github />
          </IconButton>
          <IconButton className={style.button} href='www.linkedin.com/in/maría-guadalupe-cervera-developer'target="_blank">
          <LinkedIn/>
          </IconButton>
          <IconButton className={style.button} href='mailto: guadacervera8@gmail.com'target="_blank">
          <Email />
          </IconButton>
          </div>
      </Typography>
      </CardContent>
    </Card>
    </Fade>
    </div>
    </div> 
    )
  }
  