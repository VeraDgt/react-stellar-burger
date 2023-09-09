import React from 'react';
import PropTypes from "prop-types";

const withModal = (Component) => {
  return function(props) {
    const [open, setOpen] = React.useState(false);

    function openModal() {
      setOpen(true)
    }

    function closeModal() {
      setOpen(false)
    }

    return (
      <Component {...props} visibility={open} openModal={openModal} closeModal={closeModal}/>
    )
  }
}

withModal.propTypes = {
  Component: PropTypes.element.isRequired
}

export default withModal;