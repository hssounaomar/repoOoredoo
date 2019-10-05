import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionsPlugin from '@fullcalendar/interaction'
import InterventionForm from './InterventionForm';
import {getInterventions} from '../actions/interventions.actions';
import './main.scss' // webpack must be configured to do this
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
class Interventions extends Component {
  componentDidMount() {
    this.props.getInterventions();
  
}
  state={
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
  // 
  this.setState({
    date:arg.dateStr
  },()=>{
    this.toggleModal()
  })
  }
  displaySelectedFailures = ()=>{
    if(this.props.failures&&this.props.intervention&&this.props.intervention.failures)
      return this.displayFailures().filter(failure=>this.props.intervention.failures.includes(failure.value));
  }
  displayInterventions =()=>{
    if(this.props.interventions){
      return this.props.interventions.filter(intervention=>
      intervention.supplier==='5d11ddd5cdd3c541b4bc8db0'&&intervention.state==="en cours").map(intervention=>{
        return  { title: intervention.title, start: intervention.start,end:intervention.end,id:intervention._id}
      })
    }else{
      return [];
    }
  
  }
  handleEventClick =(e)=>{
    let intervention =this.getInterventionById(e.event.id);
    if(intervention){
      this.setState({
        intervention
      },()=>{
        this.toggleModal();
      })
    }
      }

 render(){
  
  return (
    <div className="container">
      <br></br>
    <FullCalendar displayEventTime={false} defaultView="dayGridMonth" eventClick={this.handleEventClick}   events={this.displayInterventions()} plugins={[ dayGridPlugin,interactionsPlugin ]} eventClick={this.handleEventClick}   dateClick={this.handleDateClick}/>
<InterventionForm  modal={this.state.modal} intervention={this.state.intervention} toggle={this.toggleModal} date={this.state.date}  />
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
 