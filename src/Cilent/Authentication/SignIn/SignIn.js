import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../assets/scss/style.scss';


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {
        alert(this.state.email)
        alert(this.state.password)
    }
    render() {
        return (

            <div className="auth-wrapper">
                <div className="auth-content">
                    <div className="auth-bg">
                        <span className="r" />
                        <span className="r s" />
                        <span className="r s" />
                        <span className="r" />
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            <h3 className="mb-4">Login</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.onChange} required />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" name="password" className="form-control" placeholder="password" onChange={this.onChange} required />
                                </div>                                
                                <button className="btn btn-primary shadow-2 mb-4">Login</button>
                                <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/signUp">Signup</NavLink></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUp;