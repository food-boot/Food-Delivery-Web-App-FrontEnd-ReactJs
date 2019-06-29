import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { NavDropdown, Navbar, Nav, } from 'react-bootstrap';


class Breadcrumb extends Component {
    state = {
        main: [],
        item: []
    };
    constructor() {
        super();
        this.state = {
            auth: true
        };
    }

    componentWillMount = () => {
        this.setState({
            auth: true
        })

    }
    componentWillMount = () => {
        this.setState({
            auth: true
        })
        // setTimeout(
        //     function() {
        //         try {
        //             var data = localStorage.getItem('type');
        //             console.log(data)
        //             if (data == 'user') {
        //                 this.setState({
        //                     auth: false
        //                 })
        //                 // var data = localStorage.getItem('data');
        //             } else {
        //                 this.setState({
        //                     auth: true
        //                 })
        //             }
        //         } catch{
        //             //   this.props.history.push('/signIn')
        //         }
        //     }
        //     .bind(this),
        //     4000
        // );


    }

    logout = () => {
        localStorage.removeItem('data');
        localStorage.removeItem('type');
        this.setState({
            auth: false
        })

        //this.props.history.push('/signIn')
    }
    render() {


        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Foof Court</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/users">Users</Nav.Link>
                        {/* <Nav.Link ><Link to="/dashboard">charts</Link></Nav.Link>
                            <Nav.Link ><Link to="/cart">Cart</Link></Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/form">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}

                    </Nav>
                    <Nav>
                        {/* <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link> */}
                        <Nav.Link href="/signIn">LogOut</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );


    }
}

export default Breadcrumb;