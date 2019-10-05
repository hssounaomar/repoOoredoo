import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import AutoCompleteInput from './AutoCompleteInput';
import classnames from 'classnames';
import { getSites } from '../actions/sitesActions';
import { getSuppliers } from '../actions/usersActions';
import { getEquipementsTypes } from '../actions/equipementTypesActions';
import { getCategories } from '../actions/categoriesActions'
import { addEquipement, updateEquipement, getEquipements } from '../actions/equipements.actions'
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
      qrCode: '',
      toDelete: []
    }
  };

  resetForm = () => {
    let clone = {...this.state.formInputs}
    for(const key in clone) {
      clone[key] = Array.isArray(clone[key]) ? [] : '';
    }
    this.setState({formInputs: {...clone}})
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getEquipements();
    this.props.getEquipementsTypes();
    this.props.getSites();
    this.props.getSuppliers();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.form) {
      this.resetForm();
    }
    if(nextProps.equipement !== undefined) {
      console.log(nextProps.equipement)
      this.setState({ 
        formInputs: {
          ...this.state.formInputs,
          ...nextProps.equipement,
          site: nextProps.equipement.site._id,
          type: nextProps.equipement.type._id
        } 
      }, () => console.log(this.state.formInputs))
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
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let equivalents = {};

    const obligatoryFields = ["brand", "model", "site", "type", "supplier"];

    
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
      
      const isValid = !Object.keys(this.state.errors).length;
      if (isValid) {
        //this.setState({loading : true})
        console.log('VALID')
        let newEquipement = {...this.state.formInputs}

        Object.keys(newEquipement).forEach(key => {
          console.log(`${key} : ${newEquipement[key]}`)
          if (!newEquipement[key].length || newEquipement[key] === undefined) {
            delete newEquipement[key];
          }
        })

        this.props.equipement === undefined
        ?
          this.props.addEquipement(newEquipement)
        :
          this.props.updateEquipement(newEquipement)
      }
    });
  }

  toggleUrl = (e) => {
    this.setState({
      switchToUrl: !this.state.switchToUrl,
      formInputs: { ...this.state.formInputs, url: '', files: [] }
    })
  }

  getItem = (data, id) => data.find( item => item._id === id)

  imagePreview = (property) => (
    property === 'url'
    ?
    <div className="file-preview">
      <button onClick={() => this.deleteAttachement(property)}>&times;</button>
      <img className="attachement" src={this.state.formInputs[property]} alt="attachement" />
    </div>
    :
    property === 'attachements'
        ?
        this.state.formInputs[property].map( item => 
        <div className="file-preview" key={item._id} >
            <button onClick={() => this.deleteAttachement(property, item._id)}>&times;</button>
            <img className="attachement" src={item.url} alt="attachement" />
        </div>
        )
        :
        this.state.formInputs[property].map( (item, index) => 
        <div className="file-preview" key={index} >
            <button onClick={() => this.deleteAttachement(property, index)}>&times;</button>
            <img className="attachement" src={URL.createObjectURL(item)} alt="attachement" />
        </div>
        )
  )

  deleteAttachement = (property, id=undefined) => {
    property === 'attachements'
    ?
    this.setState({ formInputs: {
      ...this.state.formInputs,
      toDelete: [...this.state.formInputs.toDelete, this.state.formInputs.attachements.find( item => item._id === id).url],
      [property]: [...this.state.formInputs[property].filter(item => item._id !== id)]
    }})
    :
    property ==='files'
        ?
        this.setState({ formInputs: {
        ...this.state.formInputs,
        [property]: this.state.formInputs[property].slice(id + 1)
        }})
        :
        this.setState({ formInputs: { ...this.state.formInputs, [property]: '' } })
  }
  
  propertyExists = property => this.state.formInputs[property] !== undefined && this.state.formInputs[property].length !== 0

  render() {
    return (
      <Modal isOpen={this.props.form} toggle={this.props.toggleForm} className={this.props.className}>

        <div className="modal-header">
          <div className="modal-title">{this.props.equipement ? 'Modifier' : 'Ajouter'} un equipement</div>
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
                  required
                  className="form-control"
                  name="supplier"
                  value={this.state.formInputs.supplier}
                  onChange={this.handleChange}
                >
                  <option value="" disabled defaultValue >Fournisseurs</option>
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
                this.propertyExists('files') && this.imagePreview('files')
                
              }
              { 
                this.propertyExists('attachements') && this.imagePreview('attachements')
                
              }
              {
                this.propertyExists('url') && this.imagePreview('url')
              }
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
    isAuth: state.auth.isAuhenticated,
    categories: state.categories,
    sites: state.sites,
    equipementsTypes: state.equipementsTypes,
    suppliers: state.suppliers,
    equipements: state.equipements,
    equipement: state.equipements.find( equipement => equipement._id === props.id)
  }
}

export default connect(mapStateToProps, { addEquipement, updateEquipement, getEquipements, getCategories, getEquipementsTypes, getSites, getSuppliers })(EquipementForm);