import React from 'react';
import './switch.css';

const Switch = ({ isOn, handleToggle, onColor, label1, label2 }) => {
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
        <span className={isOn ? 'labelActive' : 'labelInactive'}>{label1}</span>
        <span className={!isOn ? 'labelActive' : 'labelInactive'}>
          {label2}
        </span>
      </div>
    </label>
  );
};

export default Switch;
