import React, { Component } from 'react'
import { getEquipementsTypes, addEquipementType, updateEquipementType, deleteEquipementType } from '../actions/equipementTypesActions'
import { connect } from 'react-redux';
import EquipementTypeForm from './EquipementTypeForm';
import Card from './Card';
import ConfirmationDialog from './ConfirmationDialog';

const Type = (props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <Card
        className="type"
        id={props.type._id}
        editAction={props.editAction}
        deleteAction={props.deleteAction}
      >
        <h5 className="card-title">
          {props.type.name}
        </h5>
      </Card>
    </div>
  )
}

class EquipementTypes extends Component {
  state = {
    form: false,
    id: '',
    confirmationDialog: false,
  }

  componentDidMount() {
    this.props.getEquipementsTypes();
  }

  toggleForm = (id) => {
    this.setState({ form: !this.state.form, id: id || '' })
  }

  toggleConfirmationDialog = (id) => {
    this.setState({ confirmationDialog: !this.state.confirmationDialog, id: id || '' })
  }

  render() {
    console.log(this.props)
    return (
      <div className="equipements">
        <div className="container">
          <ConfirmationDialog
            delete={this.props.deleteEquipementType}
            id={this.state.id}
            type="type"
            modal={this.state.confirmationDialog}
            toggle={this.toggleConfirmationDialog}
          />
          <div className="col-md-12">
            <div className="filter-bar">
              <div className="stickies">
              </div>
              <div className="filter-bar-right">
                <button className="new-equipement btn" onClick={this.toggleForm}>Nouveau type</button>
                <EquipementTypeForm 
                  id={this.state.id} 
                  toggle={this.toggleForm} 
                  modal={this.state.form}
                  add={this.props.addEquipementType}
                  update={this.props.updateEquipementType}
                  delete={this.props.deleteEquipementType}
                />
              </div>
            </div>
          </div>
          <div className="items">
            {this.props.types.map( (type, index) =>
              <Type
                key={index}
                type={type}
                editAction={this.toggleForm}
                deleteAction={this.toggleConfirmationDialog}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    types: state.equipementsTypes
  }
}

export default connect(mapStateToProps, { 
  getEquipementsTypes,
  addEquipementType,
  deleteEquipementType,
  updateEquipementType
})(EquipementTypes)