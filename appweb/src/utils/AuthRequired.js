import React, { Component } from 'react';
import AuthService from '../components/AuthService';


export default function AuthRequired(AuthComponent,roles) {
    // Code here now
    const Auth = new AuthService('http://localhost:5000');
 //console.log(!roles.includes(Auth.getProfile().role))

       return class AuthWrapped extends Component {
      
        componentDidUpdate(prevProps) {
           //&&this.getProfile().role&&!roles.includes(this.getProfile().role)
        
              
            if (Auth.loggedIn()&&Auth.getProfile().role&&!roles.includes(Auth.getProfile().role)) {
                console.log('inside Auth required')
                this.props.history.replace('/login')
            }
           
            
        }
        displayAuthComponent=()=>{
            try {
                
                const profile = Auth.getProfile()
               
                if (profile) {
                  
                    return (
                        <AuthComponent history={this.props.history} user={profile} />
                    )
                }
                else {
                    return null
                }
            }
            catch(err){
                Auth.logout()
                this.props.history.replace('/login')
            }
        }
        render() {
            return(
                <div>
                    {this.displayAuthComponent()}
                </div>
            )
        }
           }
}
