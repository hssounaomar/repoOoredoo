import React, { Component } from 'react'
import { getCategories, deleteCategory, addCategory, updateCategory } from '../actions/categoriesActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CategoryForm from './CategoryForm';
import Card from './Card';
import ConfirmationDialog from './ConfirmationDialog';

const Category = (props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <Card
        className="category"
        id={props.category._id}
        editAction={props.editAction}
        deleteAction={props.deleteAction}
      >
        <h5 className="card-title">
          {props.category.name}
        </h5>
        <img src={props.category.icon} alt="icon"></img>
      </Card>
    </div>
  )
}

class Categories extends Component {
  state = {
    form: false,
    id: '',
    confirmationDialog: false,
  }

  componentDidMount() {
    this.props.getCategories();
  }

  toggleForm = (id) => {
    this.setState({ form: !this.state.form, id: id || '' })
  }

  toggleConfirmationDialog = (id) => {
    this.setState({ confirmationDialog: !this.state.confirmationDialog, id: id || '' })
  }

  render() {
    return (
      <div className="equipements">
        <div className="container">
          <ConfirmationDialog
            delete={this.props.deleteCategory}
            id={this.state.id}
            type="categorie"
            modal={this.state.confirmationDialog}
            toggle={this.toggleConfirmationDialog}
          />
          <div className="col-md-12">
            <div className="filter-bar">
              <div className="stickies">
              </div>
              <div className="filter-bar-right">
                <button className="new-equipement btn" onClick={this.toggleForm}>Nouvelle Categorie</button>
                <CategoryForm 
                  id={this.state.id} 
                  toggle={this.toggleForm} 
                  modal={this.state.form}
                  categories={this.props.categories}
                  add={this.props.addCategory}
                  update={this.props.updateCategory}
                  delete={this.props.deleteCategory}
                />
              </div>
            </div>
          </div>
          <div className="items">
            {this.props.categories.map( (category, index) =>
              <Category
                key={index}
                category={category}
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
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getCategories, deleteCategory, addCategory, updateCategory }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Categories)