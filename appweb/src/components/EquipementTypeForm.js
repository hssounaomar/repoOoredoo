import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import classnames from 'classnames';
import { getCategories } from '../actions/categoriesActions'
import { connect } from 'react-redux';

class EquipementTypeForm extends React.Component {
  state = {
    loading: false,
    modal: false,
    errors: {},
    formInputs: {
      name: '',
      category: '',
      description: ''
    }
  };

  componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.form) {
      this.setState({
        formInputs: {name: '', category: '',description: ''}
      })
    }
    if(nextProps.type !== undefined) {
      console.log(nextProps.type)
      this.setState({ 
        formInputs: { ...nextProps.type, category: nextProps.type.category._id } 
      })
    }
  }

  handleChange = (e) => {
    console.log(e.target.name)
    if (!!this.state.errors[e.target.name]) {
      this.setState({
        formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value },
        errors: { ...this.state.errors, [e.target.name]: '' }
      }, () => console.log(this.state.formInputs))
    } else {
      this.setState({
        formInputs: {
          ...this.state.formInputs,
          [e.target.name]: e.target.value
        }
      }, () => console.log(this.state.formInputs))

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    const obligatoryFields = ["name", "category"];

    obligatoryFields.forEach(key => {
      if (this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
    })

    this.setState({ errors }, () => {
      const isValid = !Object.keys(this.state.errors).length;
      if (isValid) {
        //this.setState({loading : true})
        
        if(this.props.type === undefined) {
          this.props.add(this.state.formInputs)
        } else {
          this.props.update(this.state.formInputs)
        }

      }
    });
  }



  render() {
    console.log(this.props)
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
          <div className="modal-header">
            <div className="modal-title">{this.props.type ? 'Modifier' : 'Ajouter'} un type</div>
            <button className="close" onClick={this.props.toggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <ModalBody>
            <div className={classnames('loading-overlay', { show: this.state.loading })}>
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
            <form className="equipement-form" onSubmit={this.handleSubmit}>
              <div className="form-row">
                <div className={classnames("form-group col-md-6", { error: !!this.state.errors.name })}>
                  <label htmlFor="">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    name="name"
                    value={this.state.formInputs.name}
                    onChange={this.handleChange}
                  />
                  <span className="input-hint">{this.state.errors.name}</span>
                </div>
                <div className={classnames("form-group col-md-6", { error: !!this.state.errors.category })}>
                  <label >Catégorie</label>
                  <select
                    className="form-control"
                    name="category"
                    value={this.state.formInputs.category}
                    onChange={this.handleChange}
                  >
                    <option defaultValue>Categorie</option>
                    {this.props.categories.map(category =>
                      <option key={category._id} value={category._id}>{category.name}</option>
                    )}
                  </select>
                  <span className="input-hint">{this.state.errors.category}</span>
                </div>
              </div>
              <div className="form-row">
                <div className={classnames("form-group col-md-12")}>
                  <label htmlFor="">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    value={!!this.state.formInputs.description ? this.state.formInputs.description : ''}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="btn submit-btn">sauvegrader</button>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    type: state.equipementsTypes.find( type => type._id === props.id)
  }
}

export default connect(mapStateToProps, { getCategories })(EquipementTypeForm);