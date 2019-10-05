import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getNotifications, addNotification} from '../actions/notificationsActions';
//import { socket } from '../App';


export class NotificationsBox extends Component {

    state = {
        isOpen: false,
        filter: ''
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    componentDidMount() {
        // socket.on('notification', data =>
        //     this.props.addNotification(data)
        // )
        this.props.getNotifications();
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if( !this.notificationsBox.contains(e.target) && !this.btn.contains(e.target)) {
            this.setState({ isOpen: false })
        }
    }

    styleText = text => {
        const rest = text.split(' ');
        const first = rest.shift();
        const last = [...rest].pop().length === 1 ? rest.splice(-2, 2).join(' ') : rest.pop();
        return (
            <>
                <span>{first}</span> {rest.join(' ')} <span>{last}</span>
            </>
        )
    }

    getIcon = state => {
        switch(state) {
            case'pending': return 'images/clock.svg' 
            case'succeded': return 'images/check.svg'; 
            default: return 'images/x.svg';         
        }
    }

    setVisibilityFilter = filter => {
        this.setState({ filter }, () => console.log(this.state))
    }

    applyFilter = (notifications) => {
        return this.state.filter !== ''
        ?
        notifications.filter( notification => notification.state === this.state.filter )
        :
        notifications
    }
    
    
    backgroundColor = state => {
        switch(state) {
            case 'pending':
                return 'warning'
            case 'failed':
                return 'fail'
            default:
                return 'success'
        }
    }

    calculateDate = date => {
        const difference = new Date() - new Date(date);
        return {
            days: Math.round(difference / (1000 * 60 * 60 * 24)),
            hours: Math.round(difference / (1000 * 60 * 60)),
            minutes: Math.round(difference / (1000 * 60)),
            seconds: Math.round(difference / 1000)
        }
    }

    displayDate = date => {
        const { days, hours, minutes, seconds } = this.calculateDate(date);
        switch(true) {
            case days > 0:
                return days === 1 ? `il y a un jour` : `il y a ${days} jours`
            case hours > 0:
                return hours === 1 ? `il y a une heure` : `il y a ${hours} heures`
            case minutes > 0:
                return minutes === 1 ? `il y a une minute` : `il y a ${minutes} minutes`
            default:
                return seconds < 3 ? `à l'instant` : `il y a quelques secondes`
        }
    }

    reminderMessage = notifications =>  {
        if( notifications.length === 1 ) 
            return 'une notification non lue';
        
        if( notifications.length > 1 ) 
            return `${notifications.length} notifications non lues`;

        return `aucune nouvelle notification`;
    }

    render() {
        return (
            <div className="ml-auto  notifications">
                <button ref={node => this.btn = node} className="notifications-btn" onClick={this.toggle}>
                    <div className="notifications-bubble">2</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
                        <path d="M12.5 28C2.7 28 0 25.3 0 15.5 0 5.7 2.7 3 12.5 3 13.2 3 13.8 3 14.4 3 14.7 3.1 14.9 3.3 14.9 3.6 14.9 3.8 14.6 4.1 14.4 4 13.8 4 13.2 4 12.5 4 3.3 4 1 6.3 1 15.5 1 24.7 3.3 27 12.5 27 21.7 27 24 24.7 24 15.5 24 14.8 24 14.2 24 13.6 23.9 13.4 24.2 13.1 24.4 13.1 24.7 13.1 24.9 13.3 25 13.6 25 14.2 25 14.8 25 15.5 25 25.3 22.3 28 12.5 28Z"/>
                    </svg>
                </button>
                <div ref={node => this.notificationsBox = node} className={`card notifications-box ${this.state.isOpen && 'show'}`}>
                    <div href="#none" className="notification notifications-summary">
                        <p className="">{this.reminderMessage(this.props.notifications)}</p>
                        <div className="notifications-filter">
                            <button className="item warning" onClick={() => this.setVisibilityFilter('pending')}></button>
                            <button className="item success" onClick={() => this.setVisibilityFilter('succeded')}></button>
                            {/* <button className="item fail" onClick={() => this.setVisibilityFilter('failed')}></button> */}
                        </div>
                    </div>
                    {this.applyFilter(this.props.notifications).map( notification => 
                        <a key={notification._id} href="#none" className="notification">
                            <div className="notification-thumbnail">
                                <div className={`icon ${this.backgroundColor(notification.state)}`}>
                                    <img src={this.getIcon(notification.state)} alt=""/>
                                </div>
                            </div>
                            <div className="notification-content">
                                <h6 className="primary">{this.styleText(notification.message)}</h6>
                                <p className="secondary">{ this.displayDate(notification.date) }</p>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
}
export default connect(mapStateToProps, {getNotifications, addNotification})(NotificationsBox)
