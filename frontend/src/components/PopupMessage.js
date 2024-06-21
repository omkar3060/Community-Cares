import React, { useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./PopupMessage.css";

const PopupMessage = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-message-overlay">
      <div className="popup-message">
        <Alert variant="success" onClose={onClose} dismissible>
          {message}
        </Alert>
      </div>
    </div>
  );
};

export default PopupMessage;
