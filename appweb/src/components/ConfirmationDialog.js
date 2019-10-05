import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

const ConfirmationDialog = (props) => {
  return (
    <Modal isOpen={props.modal} fade={false} toggle={props.toggle} className={`confirmation-dialog col-lg-2 ${props.className}`}>
      <ModalBody>
        <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>
        </div>
        <h4 className="message">Voulez-vous vraiment supprimer cet(te) {props.type}?</h4>
      </ModalBody>
      <div className="modal-actions">
        <button className="action discard" onClick={props.toggle}>Annuler</button>
        <button className="action delete" onClick={() => {
          props.delete(props.id); 
          props.toggle()
        } 
          }>Confirmer</button>
      </div>
    </Modal>
  )
}

export default ConfirmationDialog; 
