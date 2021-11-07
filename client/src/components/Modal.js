import React from 'react';
import '../CSS/Modal.css';

export const Modal = ({ children, isOpen, closeModal }) => {
  const handleClick = e => e.stopPropagation();

  return (
    <div className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
      <div className='modal-container' onClick={handleClick}>
        <button className='modal-close' onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
