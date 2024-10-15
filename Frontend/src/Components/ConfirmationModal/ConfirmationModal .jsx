import React from 'react'
import './confirmationmodal.css'

const ConfirmationModal  = ({ isOpen, onClose, onConfirm, actionType }) => {
    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{`Confirm ${actionType}`}</h2>
        <p>{`Are you sure you want to ${actionType.toLowerCase()} this record?`}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal 
