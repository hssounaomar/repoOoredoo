import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionsPlugin from '@fullcalendar/interaction'
import InterventionForm from './InterventionForm';
import {getInterventions} from '../actions/interventionsActions';
import './main.scss' // webpack must be configured to do this
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Fns from 'date-fns';

class Interventions extends Component {
  componentDidMount() {
    this.props.getInterventions();
  
}
  state={
    titleOfForm:"",
    modal:false,
    date:null,
    intervention:null
  }

  getInterventionById =(id)=>{
    return this.props.interventions.find(intervention=>{
      return intervention._id===id;
    })
  }
  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
   
  }
  handleDateClick = (arg) => {
let selectedDate =new Date(arg.date);
let today=new Date();
today.setDate(today.getDate() - 1);
  if(selectedDate>=today){
    this.setState({
      date:arg.dateStr,
      titleOfForm:"Ajouter une Intervention",
      intervention:null
    },()=>{
      this.toggleModal()
    })
  }
  }
 displayColorOfIntervention=(stateOfIntervention)=>{
  switch (stateOfIntervention) {
    case "cloturer":
      return '#B6BBAF'
    case 'confirme':
      return '#FFF333'
      default:
        return "#33B5FF";
  }
 }
  displayInterventions =()=>{
    if(this.props.interventions){
      return this.props.interventions.map(intervention=>{
        let color=this.displayColorOfIntervention(intervention.state);
        return  {backgroundColor:color,editable:true,borderColor:color, title: intervention.title, start: intervention.start,end:intervention.end,id:intervention._id}
      })
    }else{
      return [];
    }
  
  }
  handleEventClick =(e)=>{
let intervention =this.getInterventionById(e.event.id);
if(intervention&&intervention.state!=="cloturer"){
  this.setState({
    intervention,
    titleOfForm:"Intervention"
  },()=>{
    this.toggleModal();
  })
}
  }
  disableDates=(date,el,view)=>{
    
    var today=new Date();
    today.setDate(today.getDate() - 1);
    if(date.date<today){
   
      date.el.classList.add("disbled");
    }else{
      date.el.classList.add("activatedDate");
    }
  }

 render(){
   console.log(this.props.interventions)
  
  return (
    <div className="container">
      <br></br>
    <FullCalendar  displayEventTime={false} defaultView="dayGridMonth"  dayRender={this.disableDates}   events={this.displayInterventions()} plugins={[ dayGridPlugin,interactionsPlugin ]} eventClick={this.handleEventClick}   dateClick={this.handleDateClick}/>
<InterventionForm titleOfForm={this.state.titleOfForm}  modal={this.state.modal} intervention={this.state.intervention} toggle={this.toggleModal} date={this.state.date}  />
    </div>
  )
 }
  
}
const mapStateToProps = state => {
  return {
   interventions:state.interventions
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({getInterventions}, dispatch)
}    
export default connect(mapStateToProps,mapDispatchToProps )(Interventions);
 