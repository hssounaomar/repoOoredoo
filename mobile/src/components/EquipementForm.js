import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import AutoCompleteInput from './AutoCompleteInput';
import classnames from 'classnames';
import { getSites } from '../actions/sites.actions';
import { getSuppliers } from '../actions/users';
import { getEquipementsTypes } from '../actions/equipementTypes.actions';
import { getCategories } from '../actions/categories.actions'
import { addEquipement } from '../actions/equipements.actions'
import { updateEquipement } from '../actions/equipements.actions'
import { getEquipements } from '../actions/equipements.actions'
import { connect } from 'react-redux';

class EquipementForm extends React.Component {

  state = {
    loading: false,
    switchToUrl: false,
    filePreview: '',
    errors: {},
    formInputs: {
      parents: [],
      brand: '',
      model: '',
      price: '',
      site: '',
      type: '',
      ip: '',
      url: '',
      supplier: '',
      files:  [],
      qrCode: ''
    }
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getEquipements();
    this.props.getEquipementsTypes();
    this.props.getSites();
    this.props.getSuppliers();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.equipement !== undefined) {
      console.log(nextProps.equipement)
      this.setState({ 
        formInputs: {
          ...this.state.formInputs,
          ...nextProps.equipement,
          site: nextProps.equipement.site._id,
          type: nextProps.equipement.type._id
        } 
      })
    }
  }

  handleTags = (id, type) => {
    if (type === 'add') {
      this.setState({ formInputs: { ...this.state.formInputs, parents: [...this.state.formInputs.parents, id] } })
    } else if (type === 'delete') {
      this.setState({ formInputs: { ...this.state.formInputs, parents: [...this.state.formInputs.parents].filter(parent => parent !== id) } })
    }
  }

  handleChange = (e) => {
    if (e.target.name === 'file')
      return this.setState({
        formInputs: { ...this.state.formInputs, files: [...e.target.files], url: '' }
      })

    if (e.target.name === 'url')
      return this.setState({
        formInputs: { ...this.state.formInputs, file: '', url: e.target.value }
      })


    if (!!this.state.errors[e.target.name]) {
      this.setState({
        formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value },
        errors: { ...this.state.errors, [e.target.name]: '' }
      })
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
    console.log(this.state.formInputs);
    e.preventDefault();
    let errors = {};
    let equivalents = {};

    const obligatoryFields = ["brand", "model", "site", "type", "supplier", "parents"];

    
    if (this.props.sites.every(site => site._id !== this.state.formInputs.site)) {
      const siteEquivalent = this.props.sites.find(site => site.name.toLowerCase() === this.state.formInputs.site.toLowerCase());
      if(!siteEquivalent) {
        errors.site = `'${this.state.formInputs.site.toUpperCase()}' ne correspond à aucun site`;
      } else {
        equivalents.site = siteEquivalent._id;
      }
    }
    
    if(this.props.equipementsTypes.every(type => type._id !== this.state.formInputs.type)) {
      const typeEquivalent = this.props.equipementsTypes.find(type => type.name.toLowerCase() === this.state.formInputs.type.toLowerCase());
      if(!typeEquivalent) {
        errors.type = `'${this.state.formInputs.type.toUpperCase()}' ne correspond à aucun type`;
      } else {
        equivalents.type = typeEquivalent._id;
      }
    }

    obligatoryFields.forEach(key => {
      if (!this.state.formInputs[key].length) {
        errors[key] = 'Veuillez remplir ce champs'
      }
    })

    this.setState({ errors, formInputs : {...this.state.formInputs, ...equivalents} }, () => {
      console.log(this.state.formInputs)
      const isValid = !Object.keys(this.state.errors).length;
      if (isValid) {
        //this.setState({loading : true})
        console.log('VALID')
        let newEquipement = {...this.state.formInputs}
        Object.keys(newEquipement).forEach(key => {
          if (!newEquipement[key].length) {
            delete newEquipement[key];
          }
        })

        console.log(newEquipement)

        if(this.props.equipement === undefined) {
          this.props.addEquipement(newEquipement);
        } else {
          delete newEquipement.attachements;
          this.props.updateEquipement(newEquipement);
        }

      }
    });
  }

  toggleUrl = (e) => {
    console.log(e.target.name)
    this.setState({
      switchToUrl: !this.state.switchToUrl,
      formInputs: { ...this.state.formInputs, url: '', files: [] }
    }, () => console.log(this.state.formInputs))
  }

  getItem = (data, id) => data.find( item => item._id === id)
  
  render() {
    /* console.log(this.props) */
    this.props.identifier && console.log(this.props.identifier)
    return (
      <Modal isOpen={this.props.form} toggle={this.props.toggleForm} className={this.props.className}>

        <div className="modal-header">
          <div className="modal-title">Ajouter un equipement</div>
          <button className="close" onClick={this.props.toggleForm}>
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
              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.brand })}>
                <label >Marque</label>
                <AutoCompleteInput
                  handleChange={this.handleChange}
                  name="brand"
                  placeholder="Marque"
                  data={this.props.equipements}
                  value={this.state.formInputs.brand}
                />
                <span className="input-hint">{this.state.errors.brand}</span>
              </div>

              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.model })}>
                <label >Modèle</label>
                <AutoCompleteInput
                  handleChange={this.handleChange}
                  name="model"
                  placeholder="Modèle"
                  data={this.props.equipements}
                  value={this.state.formInputs.model}
                />
                <span className="input-hint">{this.state.errors.model}</span>
              </div>

            </div>

            <div className="form-row">

              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.site })}>
                <label >Site</label>
                <AutoCompleteInput
                  list
                  name="site"
                  placeholder="Site"
                  data={this.props.sites}
                  handleChange={this.handleChange}
                  value={
                    this.getItem(this.props.sites, this.state.formInputs.site)
                    ?
                    this.getItem(this.props.sites, this.state.formInputs.site).name
                    :
                    ''
                  }
                />
                <span className="input-hint">{this.state.errors.site}</span>
              </div>

              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.type })}>
                <label >Type</label>
                <AutoCompleteInput
                  list
                  name="type"
                  placeholder="Type"
                  data={this.props.equipementsTypes}
                  handleChange={this.handleChange}
                  value={
                    this.getItem(this.props.equipementsTypes, this.state.formInputs.type)
                    ?
                    this.getItem(this.props.equipementsTypes, this.state.formInputs.type).name
                    :
                    ''
                  }
                />
                <span className="input-hint">{this.state.errors.type}</span>
              </div>
            </div>

            <div className="form-row">
              <div className={classnames("form-group col-md-12", { error: !!this.state.errors.parents })}>
                <label>Parents</label>
                <AutoCompleteInput
                  multiple
                  handleTags={this.handleTags}
                  /* handleChange={this.handleChange} */
                  tags={this.state.formInputs.parents}
                  name="parents"
                  placeholder="Tapez une référence"
                  data={this.props.equipements}
                />
                <span className="input-hint">{this.state.errors.parents}</span>
              </div>
            </div>

            <div className="form-row">
              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.supplier })}>
                <label >Fournisseurs</label>
                <select
                  className="form-control"
                  name="supplier"
                  value={this.state.formInputs.supplier}
                  onChange={this.handleChange}
                >
                  <option defaultValue>Fournisseurs</option>
                  {this.props.suppliers.map(supplier =>
                    <option key={supplier._id} value={supplier._id}>{supplier.firstName}</option>
                  )}
                </select>
                <span className="input-hint">{this.state.errors.supplier}</span>
              </div>
              <div className={classnames("form-group col-md-6", { error: !!this.state.errors.qrCode })}>
                <label htmlFor="">Code QR</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Code QR"
                  name="qrCode"
                  value={this.state.formInputs.qrCode}
                  onChange={this.handleChange}
                />
                <span className="input-hint">{this.state.errors.qrCode}</span>
              </div>
            </div>

            <div className="form-group form-check">
              <input onChange={this.toggleUrl} className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">Utiliser un URL</label>
            </div>

            <div className="form-row">
              <div className={classnames("form-group", "file__toggler", "col-md-12", { switched: this.state.switchToUrl })}>
                <div className="custom-file file__toggler--file">
                  <input multiple
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    name="file"
                    onChange={this.handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">Attacher un fichier</label>
                </div>
                <div className="file__toggler--url">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="URL"
                    name="url"
                    value={this.state.formInputs.url}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {
                this.state.formInputs.files.length !== 0 && this.state.formInputs.files.map((file, index) =>
                  <img key={index} className="attachement" src={URL.createObjectURL(file)} alt="url" />
                )
              }
              { 
                this.state.formInputs.attachements !== undefined 
                && this.state.formInputs.attachements.length !==0  && this.state.formInputs.attachements.map((attachement, index) =>
                <img  key={index} className="attachement" src={attachement.url} alt="url" /> 
                )
                }
              
              {this.state.formInputs.url !== '' && <img className="attachement" src={this.state.formInputs.url} alt="url" />}
            </div>
            <button type="submit" className="btn submit-btn">sauvegarder</button>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    sites: state.sites,
    equipementsTypes: state.equipementsTypes,
    suppliers: state.suppliers,
    equipements: state.equipements,
    equipement: state.equipements.find( equipement => equipement._id === props.identifier)
  }
}

export default connect(mapStateToProps, { addEquipement, updateEquipement, getEquipements, getCategories, getEquipementsTypes, getSites, getSuppliers })(EquipementForm);