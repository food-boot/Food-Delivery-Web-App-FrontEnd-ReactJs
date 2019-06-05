import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../../assets/scss/style.scss';

class SignUp extends React.Component {
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
                                <i className="feather icon-user-plus auth-icon" />
                            </div>
                            <h3 className="mb-4">Sign up</h3>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Username" />
                            </div>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" />
                            </div>
                            <div className="input-group mb-4">
                                <input type="password" className="form-control" placeholder="password" />
                            </div>
                            <div className="form-group text-left">                                
                            </div>
                            <button className="btn btn-primary shadow-2 mb-4" ><NavLink to="/signUp">Sign Up</NavLink></button>
                            <p className="mb-0 text-muted">Allready have an account? <NavLink to="/signIn">Sign In</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUp;