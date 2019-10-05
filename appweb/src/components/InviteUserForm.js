import React from 'react';
import classnames from 'classnames';
import { Modal, ModalBody, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { invite } from '../actions/usersActions'

class InviteUserForm extends React.Component {
    state = {
        loading: false,
        errors: {},
        msg: null,
        formInputs: {
            email: '',
            role: ''
        }
    };

    componentWillReceiveProps(nextProps){
        if( !nextProps.modal ) {
            this.setState({ loading: false,
                errors: {},
                res: null,
                formInputs: {
                    email: '',
                    role: ''
                }
            })
        }
    }

    /* componentDidUpdate(prevProps) {
        const { error } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'INVITE_FAIL') {
                console.log(error)
                this.setState({ res: {msg: error.msg, type: 'fail'} }) 
            }
        }
    } */

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            console.log(e.target)
            this.setState({
                formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value },
                errors: { ...this.state.errors, [e.target.name]: '' }
            })
        } else {
            this.setState({ formInputs: { ...this.state.formInputs, [e.target.name]: e.target.value } })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        Object.keys(this.state.formInputs).forEach(key => {
            if (this.state.formInputs[key] === "") errors[key] = 'Ce champs est obligatoire'
        })

        this.setState({ errors }, () => {
            if (!Object.keys(this.state.errors).length) {
                this.props.invite(this.state.formInputs)
                .then( response => {
                    this.setState({ res: {msg: response.data, type: 'success'} }) 
                })
                .catch( error => {
                    this.setState({ res: {msg: error.response.data, type: 'fail'} }) 
                })
            }
        });
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <div className="modal-header">
                    <div className="modal-title">Inviter un collaborateur</div>
                    <button className="close" onClick={this.props.toggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <ModalBody>

                    <div className={classnames('loading-overlay', { show: this.state.loading })}>
                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                    {
                    this.state.res 
                    ?
                    <div className="alert-container">
                        <Alert color={this.state.res.type === 'fail' ? 'danger' : 'success'}>{this.state.res.msg}</Alert>
                    </div>
                    : 
                    null
                    }

                    <form className="equipement-form" onSubmit={this.handleSubmit}>

                        <div className="form-row">
                            <div className={classnames("form-group col-md-12", { error: !!this.state.errors.email })}>
                                <label htmlFor="">Adresse Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"
                                    value={this.state.formInputs.email}
                                    onChange={this.handleChange}
                                />
                                <span className="input-hint">{this.state.errors.email}</span>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className={classnames("form-group col-md-12", { error: !!this.state.errors.role })}>
                                <label >Role</label>
                                <select
                                    className="form-control"
                                    name="role"
                                    value={this.state.formInputs.role}
                                    onChange={this.handleChange}
                                >
                                    <option value="" disabled defaultValue>Role</option>
                                    <option value="agent">agent</option>
                                    <option value="supplier">fournisseur</option>
                                </select>
                                <span className="input-hint">{this.state.errors.role}</span>
                            </div>
                        </div>
                        <button type="submit" className="btn submit-btn">sauvegrader</button>
                    </form>
                </ModalBody>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return{
        error: state.error
    }
}

export default connect(mapStateToProps, { invite })(InviteUserForm);