import sty from './mercadoPago.module.css'
import foto from '../../images/peligro.png'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function Fail() {

  return (
    <Card className={sty.suc} elevation={0} sx={{background:'none',border:'none'}}>
        <CardHeader
        title="Ocurrió un error con tu donación"
        error={true}
      />
      <img src={foto} alt="Peligro" className={sty.img}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Tu donación no pudo ser procesada.
            <br/>
            Si de todas maneras quieres ayudar a las mascotas, por favor intenta de nuevo.
        </Typography>
      </CardContent>
    </Card>
  );
}