import { useDispatch } from 'react-redux';
import {
  filterByState,
  filterByLatest,
  getTypes,
  getGenres
} from '../redux/actions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Button } from '@mui/material';
import style from '../CSS/Filter.module.css'

export default function Filters() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState('');
  const [type, setType] = React.useState('');
  const [genre, setGenre] = React.useState('');
  // const [filters, setFilters] = React.useState({
  //   state: '',
  //   type: '',
  //   genre: ''
  // })

  //   useEffect(() => {
  //     dispatch(sendFilters(filters));
  //  }, [dispatch, filters])

  // function handleSelect(e: SelectChangeEvent) {
  //   console.log(e.target.value)
  //   setFilters({
  //     ...filters,
  //     [e.target.name] : e.target.value
  //   });
  // }

  // console.log(filters)

  function handleSelectType(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(getTypes(e.target.value));
    setType(e.target.value);
    setState('')
    setGenre('')
  }

  function handleSelectGenres(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(getGenres(e.target.value));
    setGenre(e.target.value);
    setType('')
    setState('')
  }

  function handleSelectState(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(filterByState(e.target.value));
    setState(e.target.value);
    setGenre('')
    setType('')
  }

  console.log(state)

  function handleClick(value: string) {
    //  console.log(value)
    dispatch(filterByLatest(value));
    setGenre('')
    setType('')
    setState('')
  }

  return (
    <div className={style.div}>
      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>Estado</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state}
          // name = 'state'
          label='estado'
          onChange={e => handleSelectState(e)}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='Perdido'>Perdido</MenuItem>
          <MenuItem value='Encontrado'>Encontrado</MenuItem>
          <MenuItem value='Adopción'>En adopcion</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>Especie</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={type}
          // name = 'type'
          label='estado'
          onChange={e => handleSelectType(e)}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='perro'>Perro</MenuItem>
          <MenuItem value='gato'>Gato</MenuItem>
          <MenuItem value='otro'>Otros</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>Género</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={genre}
          // name = 'genre'
          label='estado'
          onChange={e => handleSelectGenres(e)}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='Macho'>macho</MenuItem>
          <MenuItem value='Hembra'>hembra</MenuItem>
        </Select>
      </FormControl>

      <Button 
      className={style.button}
      variant="outlined"
      value='mas recientes'
      onClick={() => handleClick('mas recientes')}
      >Más recientes</Button>
      <Button 
      className={style.button}
      variant="outlined"
      value='mas antiguos'
      onClick={() => handleClick('mas antiguos')}
      >Más antiguos</Button>
    </div>
  );
}
