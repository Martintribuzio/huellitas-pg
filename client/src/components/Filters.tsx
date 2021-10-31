import { useDispatch } from 'react-redux';
import {
  filterByState,
  filterByLatest,
  getTypes,
  getGenres,
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

  function handleSelectEstado(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(filterByState(e.target.value));
    setState(e.target.value);
  }

  function handleSelectType(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(getTypes(e.target.value));
    setType(e.target.value);
  }

  function handleSelectGenres(e: SelectChangeEvent) {
    //console.log(e.target.value)
    dispatch(getGenres(e.target.value));
    setGenre(e.target.value);
  }

  function handleClick(value: string) {
    //  console.log(value)
    dispatch(filterByLatest(value));
  }

  return (
    <div className={style.div}>
      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>estado</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={state}
          label='estado'
          onChange={handleSelectEstado}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='lost'>perdido</MenuItem>
          <MenuItem value='found'>Encontrado</MenuItem>
          <MenuItem value='adoption'>en adopcion</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>especie</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={type}
          label='estado'
          onChange={e => handleSelectType(e)}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='perro'>perro</MenuItem>
          <MenuItem value='gato'>gato</MenuItem>
          <MenuItem value='otros'>otros</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: '12vw' }}>
        <InputLabel id='demo-simple-select-helper-label'>genero</InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={genre}
          label='estado'
          onChange={e => handleSelectGenres(e)}>
          <MenuItem value=''>
            <em></em>
          </MenuItem>
          <MenuItem value='Todos'>Todos</MenuItem>
          <MenuItem value='male'>macho</MenuItem>
          <MenuItem value='female'>hembra</MenuItem>
        </Select>
      </FormControl>

      <Button 
      className={style.button}
      variant="outlined"
      value='mas recientes'
      onClick={() => handleClick('mas recientes')}
      >mas recientes</Button>
      <Button 
      className={style.button}
      variant="outlined"
      value='mas antiguos'
      onClick={() => handleClick('mas antiguos')}
      >mas antiguos</Button>
    </div>
  );
}
