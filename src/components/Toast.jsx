import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`toast show align-items-center text-bg-${type} border-0 position-fixed top-0 end-0 m-4`}
      role="alert"
      style={{ zIndex: 9999, minWidth: '250px' }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Toast;
