import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDialog extends React.Component {
  /* constructor(props) {
    super(props);
  } */

  deleteCategorie =()=>{
      this.props.delete()
      this.props.toggle()
  }
  
  render() {
    return (
      <div>
     
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <ModalHeader toggle={this.props.toggle}>Supprimer Categorie</ModalHeader>
          <ModalBody>
            Est-ce que vous voulez vraiement supprimer cette categorie?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deleteCategorie}>Confirmer</Button>{' '}
            <Button color="danger" onClick={this.props.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalDialog;