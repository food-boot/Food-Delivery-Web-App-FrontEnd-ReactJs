import React from 'react';
import { Row, Col, Card, Table, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';
import axios from "axios";
import { config, baseURL } from "../config"
import Nav from "../layout/AdminLayout/Breadcrumb/index"

class FormsElements extends React.Component {
    constructor() {
        super();
        this.state = {

            users: [],
            load: false
        };
        // this.onDeleteO = this.onDeleteO.bind(this)

    }

    componentDidMount = () => {
        axios.get(baseURL + "/users", config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    var data = res.data
                    var us = this.state.users
                    data.forEach(element => {
                        us.push({
                            firstName: element.firstName,
                            lastName: element.lastName,
                            email: element.email,
                            userId: element.userId
                        })

                    });
                    this.setState({
                        load: true
                    })
                    console.log(us);

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
    }

    deleteUser = (id) => {
        var url = baseURL + "/users/" + id;


        console.log(url)
        axios.delete(url, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    window.location.reload()

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
    }

    render() {
        if (this.state.load == true) {
            return (
                <div>
                    <Nav />
                    <br/><br/>
                    <Row className="justify-content-md-center">
                        <Col md={10} className="justify-content-md-center">
                            <Col md={12} xl={12}>
                                <Card className='Recent-Users'>
                                    <Card.Header>
                                        <Card.Title as='h5'>All Users</Card.Title>
                                    </Card.Header>
                                    <Card.Body className='px-0 py-2'>

                                        <Table responsive hover>
                                            <tbody>
                                                {this.state.users.map((item, i) => {

                                                    return (
                                                        <tr key={i} className="unread">
                                                            <td>
                                                                <h6 className="mb-1">{item.firstName}</h6>
                                                                <p className="m-0">{item.lastName}</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted">
                                                                    <i className="fa fa-circle text-c-green f-10 m-r-15" />{item.email}
                                                                </h6>
                                                            </td>
                                                            <td>
                                                                <button className="label theme-bg2 text-white f-12" onClick={() => this.deleteUser(item.userId)}>Remove User</button>
                                                            </td>
                                                        </tr>
                                                    )


                                                })
                                                }


                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>


                                <br /> <br /><br />
                            </Col>
                        </Col>
                    </Row>
                </div>

            );
        } else {
            return (
                <Row></Row>
            )

        }

    }
}

export default FormsElements;
