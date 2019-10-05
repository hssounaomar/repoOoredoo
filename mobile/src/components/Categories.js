import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getCategories, deleteCategorieById, addCategorie, updateCategorie } from '../actions/categories.actions'
import CategoryForm from './CategoryForm';
import { Tooltip } from 'reactstrap';
import ModalDialog from './ModalDialog';
const Tool = (props) => {
  return (
    <div>
      <span style={{ textDecoration: "underline", color: "blue" }} id={"DisabledAutoHideExample" + props.index} >Action</span>
      <Tooltip placement="top" isOpen={props.tooltipOpen[props.index]} autohide={false} target={"DisabledAutoHideExample" + props.index} toggle={() => props.toggle(props.index)}>
        <button onClick={() => props.delete(props.categorie)} className="delete">Delete  </button> | <button className="update" onClick={() => props.update(props.categorie)}> Update</button>
      </Tooltip>
    </div>
  )
};
const Categorie = (props) => {

  return (
    <div className="category card col-md-3 col-sm-4 col-xs-12">
      <Tool categorie={props.categorie} tooltipOpen={props.tooltipOpen} id={props.categorie._id} update={props.update} delete={props.delete} toggle={props.toggle} index={props.index} />
      <h5 className="card-title">
        {props.categorie.name}

      </h5>


      <img src={props.categorie.icon} alt="icon"></img>

    </div>)
}
class Categories extends Component {
  state = {
    tooltipOpen: [],
    modal: false,
    modalDialog: false,
    selectedCategory: null,//selectedCategorie to update(object)
    action: null,//action to send to categorie form (add or update)
    categoryDeleted: null
  }

  componentDidMount() {
    this.props.getCategories();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories) {

      this.setState({
        tooltipOpen: Array(nextProps.categories.length).fill(false)
      })
    }
  }
  toggleModalDialog = () => {
    this.setState(prevState => ({
      modalDialog: !prevState.modalDialog
    }));
  }
  toggleTooltip = (index) => {
    let tooltipOpen = this.state.tooltipOpen;
    tooltipOpen[index] = !tooltipOpen[index]
    this.setState({
      tooltipOpen
    });
  }
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  addCategorie = (e) => {
    this.setState({ action: this.props.addCategorie }, () => {
      console.log(this.state.action)
      this.toggleModal()
    })
  }
  deleteCategorie = (selectedCategorie) => {
    if (selectedCategorie) {
      this.setState({
        categoryDeleted: selectedCategorie._id
      }, () => {
        this.toggleModalDialog();
      })
    }

  }
  updateCategorie = (selectedCategorie) => {
    this.setState({
      selectedCategorie,
      action: this.props.updateCategorie
    }, () => {
      this.toggleModal();
    })


  }
  render() {

    return (<div className="equipements">
      <div className="container">

        <div className="filter-bar">
          <div className="stickies">

          </div>
          <div className="filter-bar-right">
            <button className="new-equipement btn" onClick={this.addCategorie}>Nouveau Categorie</button>
            <CategoryForm action={this.state.action} categorie={this.state.selectedCategorie} toggle={this.toggleModal} modal={this.state.modal}></CategoryForm>
            <ModalDialog modal={this.state.modalDialog} delete={() => this.props.deleteCategorieById(this.state.categoryDeleted)} toggle={this.toggleModalDialog}></ModalDialog>
          </div>
        </div>
        <div className="items">

          {this.props.categories.map((categorie, index) =>

            <Categorie index={index} update={this.updateCategorie} delete={this.deleteCategorie} tooltipOpen={this.state.tooltipOpen} toggle={this.toggleTooltip} categorie={categorie} key={categorie._id} />

          )}
        </div>
      </div>
    </div>)

  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCategories, deleteCategorieById, addCategorie, updateCategorie }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories)