
import sty from './mercadoPago.module.css'
import foto from '../../corazon.png'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

export default function Success() {

  return (
    <Card className={sty.suc} elevation={0} sx={{ maxWidth: 400 , background:'none',border:'none'}}>
        <CardHeader
        title="Muchas gracias por la donacion!"
      />
      <CardMedia
        component="img"
        height="194"
        image={foto}
        alt="Corazon"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            El equipo de Huellitas agradece tu apoyo.
            <br/>
            Gracias a ti miles de mascotas podran encontrar su camino a casa.
        </Typography>
      </CardContent>
    </Card>
  );
}