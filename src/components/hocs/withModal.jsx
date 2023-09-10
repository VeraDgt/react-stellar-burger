import React from 'react';
import PropTypes from "prop-types";

const withModal = (Component) => {
  return function(props) {
    const [visibility, setVisibility] = React.useState(false);

    function openModal() {
      setVisibility(true)
    }

    function closeModal() {
      setVisibility(false)
    }

    return (
      <Component {...props} visibility={visibility} openModal={openModal} closeModal={closeModal}/>
    )
  }
}

withModal.propTypes = {
  Component: PropTypes.element.isRequired
}

export default withModal;