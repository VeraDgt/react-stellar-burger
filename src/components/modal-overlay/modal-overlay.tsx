import React, { FunctionComponent, MouseEvent } from 'react';
import overlayStyles from './modal-overlay.module.css';

const ModalOverlay: FunctionComponent<{ handleClose: () => void }> = ({ handleClose }) => {
  const ref = React.useRef(null);

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    return handleClose();
  }

  return (
    <div ref={ref} onClick={handleClick} className={overlayStyles.overlay}></div>
  )
}

export default ModalOverlay