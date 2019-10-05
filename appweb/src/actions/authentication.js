import AuthService from '../components/AuthService';
const Auth=new AuthService();
export const ISAUTHENTIFICATED ="ISAUTHENTIFICATED";
export function isAuthenticated(){
    
 
    return {
      type: ISAUTHENTIFICATED,
      payload: Auth.loggedIn()||false
    };
}