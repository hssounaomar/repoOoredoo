import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getEquipementsTypes,updateEquipementType,deleteEquipementTypeById,addEquipementType } from '../actions/equipementTypes.actions'
import EquipementTypeForm from './EquipementTypeForm';
import { Tooltip } from 'reactstrap';
import ModalDialog from './ModalDialog';
const Tool=(props)=>{
    return(  
        <div>
     <span style={{textDecoration: "underline", color:"blue"}} id={"DisabledAutoHideExample"+props.index} >Action</span>
<Tooltip placement="top" isOpen={props.tooltipOpen[props.index]} autohide={false} target={"DisabledAutoHideExample"+props.index} toggle={()=>props.toggle(props.index)}>
<button onClick={()=>props.delete(props.type)}  className="delete">Delete  </button> | <button href="#" className="update" onClick={()=>props.update(props.type)}> Update</button>
</Tooltip>
</div>
)   
};
const EquipementType=(props)=>{

    return(<div className="category card col-md-3 col-sm-4 col-xs-12">
    <Tool type={props.type} tooltipOpen={props.tooltipOpen} id={props.type._id} update={props.update} delete={props.delete}  toggle={props.toggle} index={props.index}/>
        
        <h5 className="card-title">
           {props.type.name}
            
        </h5>
        <img src={props.type.category.icon} alt='icon'></img>
</div>)
}
class EquipementTypes extends Component {
    state ={
        tooltipOpen: [],
        modal:false,
        modalDialog:false,
        selectedType:null,//selectedType to update(object)
        action:null,//action to send to categorie form (delete or update)
        typeDeleted:null
    }
    componentDidMount() {
        this.props.getEquipementsTypes();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.types){
            
            this.setState({
                tooltipOpen:Array(nextProps.types.length).fill(false)
            })
        }
    }
    toggleModalDialog =() =>{
        this.setState(prevState => ({
          modalDialog: !prevState.modalDialog
        }));
      }
    toggleTooltip =(index) =>{
        let tooltipOpen=this.state.tooltipOpen;
tooltipOpen[index]=!tooltipOpen[index]
        this.setState({
          tooltipOpen
        });
      }
      toggleModal = () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      addType =(e)=>{
        this.setState({action:this.props.addEquipementType},()=>{
            console.log(this.state.action)
            this.toggleModal()
        })
    }
    deleteType =(selectedType)=>{
     if(selectedType){
        this.setState({
            typeDeleted:selectedType._id
         },()=>{
            this.toggleModalDialog();
         })
     }
   
    }
    updateType =(selectedType)=>{
      this.setState({
        selectedType,
        action:this.props.updateEquipementType
      },()=>{
        this.toggleModal();
      })
    }
Type
    render(){
        console.log(this.props.types)
        return( <div className="equipements">
        <div className="container">
        {/* <FilterBar toggleFilter={this.toggleFilter}></FilterBar> */}
        <div className="filter-bar">
        <div className="stickies">
           
        </div>
        <div className="filter-bar-right">
        <button className="new-equipement btn" onClick={this.addType}>Nouveau Type </button>
        <EquipementTypeForm action={this.state.action}  equipementType={this.state.selectedType}  toggle={this.toggleModal} modal={this.state.modal}></EquipementTypeForm>
        <ModalDialog modal={this.state.modalDialog} delete={()=>this.props.deleteEquipementTypeById(this.state.typeDeleted)}  toggle={this.toggleModalDialog}></ModalDialog>
        </div>
      </div>
            <div className="items">
                {this.props.types.map( (type,index) => 
                    <EquipementType index={index}  update={this.updateType} delete={this.deleteType}  tooltipOpen={this.state.tooltipOpen} toggle={this.toggleTooltip} type={type} key={type._id}/>
                )}
            </div>
        </div>
    </div>)
         
    }
}
const mapStateToProps = state => {
    return {
        types: state.equipementsTypes
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEquipementsTypes,updateEquipementType,deleteEquipementTypeById,addEquipementType }, dispatch)
}    

export default connect(mapStateToProps,mapDispatchToProps)(EquipementTypes)