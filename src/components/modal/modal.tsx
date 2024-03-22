import React, { FunctionComponent, type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { modalRoot } from '../../utils/data';

export interface IModal extends React.HTMLAttributes<HTMLDivElement> {
  handleClose: () => void,
  title?: string,
  hasOverlay: boolean,
  children?: ReactNode,
}

const Modal: FunctionComponent<IModal> = ({ handleClose, title, children, hasOverlay }) => {
  
  React.useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      return event.key === 'Escape' && handleClose();
    }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, []);

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
      modalRoot!
  )
}

export default Modal;