import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, verifyToken } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { Alert } from 'reactstrap'
import classnames from 'classnames';

class SignupForm extends Component {

    state = {
        loading: false,
        errors: {},
        formInputs: {
            email: '',
            firstName: '',
            tel: '',
            password: '',
            passwordConfirmation: '',
            role: 'supplier'
        },
        msg: null,
        token: null
    };

    componentDidMount() {
        const { token } = this.props.match.params;
        if(token) {
            this.setState({ token }, () => {
                this.props.verifyToken(token);
            })
        }
    }

    componentDidUpdate(prevProps) {
        const { error, tokenData } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg }) 
            }
            if(error.id === 'TOKEN_INVALID') {
                this.setState({ msg: 'Le lien suivi est expiré' }) 
            }
        }

        if(tokenData !== prevProps.tokenData) {
            const { email, role } = tokenData;
            this.setState({ formInputs: {...this.state.formInputs, email, role} })
        }
        
        if(this.props.isAuthenticated) {
            this.props.history.push('/')
        }
    }

    handleChange = e => {
        console.log(e.target.name)

        if (!!this.state.errors[e.target.name]) {
            this.setState({
                formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value },
                errors: { ...this.state.errors, [e.target.name]: '' }
            })
        } else {
            this.setState({ formInputs: { ...this.state.formInputs,[e.target.name]: e.target.value } })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        let errors = {};

        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if(!emailRegex.test(this.state.formInputs.email)) {
            errors['email'] = 'Adresse email invalide'
        }
        
        const digitRegex = /^\d{8}$/;

        if(!digitRegex.test(this.state.formInputs.tel)) {
            errors['tel'] = 'Numéro invalide'
        }
        
        if(this.state.formInputs.password !== this.state.formInputs.passwordConfirmation) {
            errors['passwordConfirmation'] = 'Mot de passe ne correspond pas'
        }

        Object.keys(this.state.formInputs).forEach(key => {
            if (this.state.formInputs[key] === "") {
                errors[key] = 'Veuillez remplir ce champs'
            }
        })

        this.setState({ errors }, () => {
            console.log(this.state.errors)
            if (!Object.keys(this.state.errors).length) {
                this.props.register(this.state.formInputs, this.state.token);
                /* this.logo.classList.add('connecting'); */
            }
        });
    }

    form = () => (
        <form className="equipement-form" onSubmit={this.handleSubmit}>
            <div className="form-row">
                <div className={classnames("form-group col-md-12", { error: !!this.state.errors.email })}>
                    <label htmlFor="">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="-@ooredoo.tn"
                        name="email"
                        value={this.state.formInputs.email}
                        onChange={this.handleChange}
                    />
                    <span className="input-hint">{this.state.errors.email}</span>
                </div>
            </div>

            <div className="form-row">
                <div className={classnames("form-group col-md-12", { error: !!this.state.errors.firstName })}>
                    <label>Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nom"
                        name="firstName"
                        value={this.state.formInputs.firstName}
                        onChange={this.handleChange}
                    />
                    <span className="input-hint">{this.state.errors.firstName}</span>
                </div>
            </div>
            
            <div className="form-row">
                <div className={classnames("form-group col-md-12", { error: !!this.state.errors.tel })}>
                    <label>N° Téléphone</label>
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="-- --- ---"
                        name="tel"
                        value={this.state.formInputs.tel}
                        onChange={this.handleChange} 
                    />
                    <span className="input-hint">{this.state.errors.tel}</span>
                </div>
            </div>

            <div className="form-row">
                <div className={classnames("form-group col-md-12", { error: !!this.state.errors.password })}>
                    <label htmlFor="">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        name="password"
                        value={this.state.formInputs.password}
                        onChange={this.handleChange}
                    />
                    <span className="input-hint">{this.state.errors.password}</span>
                </div>

                <div className={classnames("form-group col-md-12", { error: !!this.state.errors.passwordConfirmation })}>
                    <label htmlFor="">Confirmation</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Veuillez confirmer"
                        name="passwordConfirmation"
                        value={this.state.formInputs.passwordConfirmation}
                        onChange={this.handleChange}
                    />
                    <span className="input-hint">{this.state.errors.passwordConfirmation}</span>
                </div>
            </div>
            <button type="submit" className="btn submit-btn">Se connecter</button>
        </form>
    )

    header = () => (
        <div className="login-header">
            <img src="/images/logo.svg" alt="logo"/>
        </div>
    )

    render() {
        return (
            <div className="login col-md-4">
                {this.header()}
                {this.state.msg ? <div className="alert-container"><Alert color="danger">{this.state.msg}</Alert></div> : null}
                {this.props.tokenData ? this.form() : null }
            </div>  
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
        tokenData: state.auth.tokenData
    }
}

export default connect(mapStateToProps, {register, verifyToken, clearErrors})(SignupForm)