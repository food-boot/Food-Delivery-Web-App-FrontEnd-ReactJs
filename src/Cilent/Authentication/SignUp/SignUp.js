import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { config, baseURL } from "../../config"
import '../../../assets/scss/style.scss';
import axios from "axios";
class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        };
    }

    componentDidMount = () => {
        // try {
        //     var data = localStorage.getItem('data');
        //     if (data == null) {
        //         this.setState({
        //             auth: false
        //         })
        //     } else {
        //         this.props.history.push('/dashboard')
        //     }
        // } catch{
        //     //   this.props.history.push('/signIn')
        // }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = () => {

        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        console.log(user);

        axios.post(baseURL + "/users", user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log(res.headers);
                if (res.status == 200) {
                    if (res.data.userType == "user") {
                        localStorage.setItem('data', res.data.userId);
                        localStorage.setItem('type', res.data.userType);
                        this.props.history.push({
                            pathname: '/cart'
                        });
                    } else {
                        this.props.history.push({
                            pathname: '/dashboard'
                        });
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
                if (error.response.status == 500) {
                    alert("User Already Exsists")
                    this.setState({ fireRedirect: true })
                }
            })




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
                                <i className="feather icon-user-plus auth-icon" />
                            </div>
                            <form onSubmit={this.onSubmit}>
                                <h3 className="mb-4">Sign up</h3>
                                <div className="input-group mb-3">
                                    <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={this.onChange} required />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={this.onChange} required />
                                </div>
                                <div className="input-group mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.onChange} required />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" name="password" className="form-control" placeholder="password" onChange={this.onChange} required />
                                </div>
                                <div className="form-group text-left">
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={() => this.onSubmit()}><NavLink to="/signUp">Sign Up</NavLink></button>
                                <p className="mb-0 text-muted">Allready have an account? <NavLink to="/signIn">Sign In</NavLink></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUp;