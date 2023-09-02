import React, { useState } from 'react';
import "./../styles/error.css"
import Error from "./../assets/notFound.svg"

function ErrorMessage({ message, onClose }) {

  const handleClose = () => {
    onClose();
  }
  return (
    <div>

      <div className="modal">
        <div className="modal-content">
          <div className='svgContain'>
            <img src={Error} />
          </div>
          <p className="error-message">{message}</p>
          <span onClick={handleClose} class="material-symbols-rounded closeBtn">
            close
          </span>
        </div>
      </div>

    </div>
  );
}

export default ErrorMessage;
