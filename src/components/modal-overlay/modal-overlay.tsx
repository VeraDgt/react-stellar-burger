import React, { FunctionComponent, MouseEvent } from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay: FunctionComponent<{ handleClose: () => void }> = ({ handleClose }) => {
  const ref = React.useRef(null);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    return handleClose();
  }

  return (
    <div ref={ref} onClick={handleClick} className={overlayStyles.overlay}></div>
  )
}

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired
}

export default ModalOverlay