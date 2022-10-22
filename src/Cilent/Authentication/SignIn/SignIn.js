import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';

import '../../../assets/scss/style.scss';
import { config, baseURL } from "../../config"
import axios from "axios";
class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            auth: false
        };
    }
   

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {

        const user = {
            email: this.state.email,
            password: this.state.password,

        };

        axios.post(baseURL + "/users/login", user)
            .then(res => {
                // alert(JSON.stringify(res))
                // console.log(res);
                // alert(JSON.stringify(res.headers))
                console.log(res);
                if (res.status == 200) {                    
                    this.setState({
                        auth: true
                    })
                    axios.get(baseURL + "/users/" + this.state.email, config)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                            
                            // var data = localStorage.getItem('data');

                            if (res.status == 200) {
                                var data = res.data
                                var id = data.userId
                                var type = data.userType
                                if (type == "user") {
                                    // localStorage.setItem('data', id);
                                    // localStorage.setItem('type', type);
                                    // this.props.history.push({
                                    //     pathname: '/cart'
                                    // });

                                } else {
                                    localStorage.setItem('data', id);
                                    localStorage.setItem('type', type);
                                    // this.props.history.push({
                                    //     pathname: '/dashboard'
                                    // });
                                }

                            } else {
                                alert("fails")
                                this.setState({
                                    errors: res.data.status
                                });
                            }

                        })
                        .catch(error => {
                            // alert(error.response)
                            console.log(error.response)

                        })

                    console.log(res.headers);

                } else {
                    // alert("Credentials mismatch")
                    this.setState({
                        errors: res.data.status
                    });
                }

            })
            .catch(error => {
                alert("Credentials mismatch")
                console.log(error.response)
                console.log(error)
                if (error.response.status == 500) {
                    // alert("User Already Exsists")
                    // this.setState({ fireRedirect: true })
                }
            })

    }
    render() {
        if (this.state.auth == false) {
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
                                <form>
                                    <div className="input-group mb-3">
                                        <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.onChange} required />
                                    </div>
                                    <div className="input-group mb-4">
                                        <input type="password" name="password" className="form-control" placeholder="password" onChange={this.onChange} required />
                                    </div>
                                    <button onClick={() => this.onSubmit()} className="btn btn-primary shadow-2 mb-4"><NavLink to="/signIN">Login</NavLink></button>
                                    <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/signUp">Signup</NavLink></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            );
        } else {
            return (
                <Navigate to="/dashboard" />
            )
        }

    }
}

export default SignUp;
