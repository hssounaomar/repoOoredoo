import decode from 'jwt-decode';
import axios from 'axios';
export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || 'http://localhost:5000' // API server domain
   
    }

    login =(email, password) =>{
        // Get a token from api server using the fetch api
        return this.fetch(`${this.domain}/login/`, {
                email,
                password
         
        }).then(res => {
          
            this.setToken(res.token,res.user) // Setting the token in localStorage
            return Promise.resolve(res);
        })
    }
    tokenConfig=()=>{
      return  {headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization:'Bearer ' + this.getToken()
        }}
    }
    loggedIn =() =>{
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired =(token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken =(idToken,user) =>{
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
        localStorage.setItem('user',JSON.stringify(user) )
    }

    getToken =()=> {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout =() =>{
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('user');
    }

    getProfile=() =>{
        // Using jwt-decode npm package to decode the token
        return JSON.parse(localStorage.getItem('user'));
    }


    fetch =(url, options) =>{
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['authorization'] = 'Bearer ' + this.getToken()
        }

        return axios.post(url, options,{headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            authorization:'Bearer ' + this.getToken()
        }})
            .then(this._checkStatus)
            .then(response => response.data)
    }

    _checkStatus =(response) =>{
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}