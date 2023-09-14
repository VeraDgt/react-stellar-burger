import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { modalRoot } from '../../utils/data';

const Modal = ({ handleClose, title, children, hasOverlay }) => {

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, []);

  function handleKeydown(event) {
    return event.key === 'Escape' && handleClose();
  }

  return ReactDOM.createPortal(
    (
      <>
        {hasOverlay && <ModalOverlay handleClose={handleClose} />}
        <div className={modalStyles.modal} >
          <h2 className={title && `${modalStyles.title}`}>{title}</h2>
          { children }
          <button onClick={handleClose} className={modalStyles.button}>
          <CloseIcon type="primary" />
          </button>
        </div>
      </>
    ),
      modalRoot
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Modal;