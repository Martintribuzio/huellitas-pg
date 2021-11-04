import React from 'react';
import './switch.css';

const Switch = ({ isOn, handleToggle, onColor }) => {
  return (
    <label style={{ background: isOn && onColor }} className='react-switch'>
      <input
        checked={isOn}
        onChange={handleToggle}
        className='react-switch-checkbox'
        type='checkbox'
      />
      <div className='react-switch-button' />
      <div className='react-switch-labels'>
        <span className={isOn ? 'labelActive' : 'labelInactive'}>
          Iniciar Sesion
        </span>
        <span className={!isOn ? 'labelActive' : 'labelInactive'}>
          Registrarse
        </span>
      </div>
    </label>
  );
};

export default Switch;
