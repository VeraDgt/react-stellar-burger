import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ closeModal }) => {
  const ref = React.useRef(null);

  function handleClick(e) {
    return e.target === ref.current && closeModal();
  }

  return (
    <div ref={ref} onClick={handleClick} className={overlayStyles.overlay}></div>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay