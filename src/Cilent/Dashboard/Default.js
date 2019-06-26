import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { Form, Button, InputGroup, FormControl, DropdownButton, Dropdown } from 'react-bootstrap';


import Nav from "../layout/AdminLayout/Breadcrumb/index";
import axios from "axios";
class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            category: '',
            price: '',
            foodName: '',
            foods: [],
            userCount: 0,
            oCount: 0,
            fCount: 0,
            orders: []
        };
        this.onDeleteO = this.onDeleteO.bind(this)

    }
    componentDidMount = () => {
        try {
            var data = localStorage.getItem('data');
            var type = localStorage.getItem('type');
            if (data == null) {
                this.props.history.push('/signIn')
            } else {
                console.log(data)
            }

            if (type == 'user') {
                this.props.history.push('/dashboard')
            }
        } catch{
            this.props.history.push('/signIn')
        }

        try {
            var data = localStorage.getItem('data');
            if (data == null) {
                this.props.history.push('/signIn')
            } else {
                console.log(data)
            }
        } catch{
            this.props.history.push('/signIn')
        }
        var config = {
            headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
        };


        axios.get(`http://localhost:8080/foods`, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    var data = res.data
                    var fd = this.state.foods
                    data.forEach(element => {
                        fd.push({
                            foodId: element.foodId,
                            foodName: element.foodName,
                            foodPrice: element.foodPrice,
                            foodCategory: element.foodCategory
                        })

                    });

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
        console.log(this.state.foods)

        axios.get(`http://localhost:8080/users`, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                var count = 0
                if (res.status == 200) {
                    var data = res.data
                    data.forEach(element => {
                        if (element.user_type != "admin") {
                            count = count + 1;
                        }
                    });
                    this.setState({
                        userCount: count
                    })

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

        axios.get(`http://localhost:8080/orders`, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                var fCount = 0
                var oCount = 0
                if (res.status == 200) {
                    var data = res.data
                    var order = this.state.orders
                    data.forEach(element => {
                        if (element.status == true) {
                            fCount = fCount + 1;
                        } else {
                            oCount = oCount + 1;
                        }
                        var item = " ";
                        for (var i = 0; i < element.items.length; i++) {
                            item = item + element.items[i] + ", "
                        }
                        order.push({
                            cost: element.cost,
                            orderId: element.orderId,
                            items: item,
                            status: element.status
                        })
                    });
                    this.setState({
                        fCount: fCount,
                        oCount: oCount
                    })


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
        console.log(this.state.orders)

    }


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onDeleteO = (id) => {
        var config = {
            headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
        };
        axios.delete(`http://localhost:8080/orders/` + id, config)
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

    onSubmit = () => {

        const food = {
            foodName: this.state.foodName,
            foodPrice: this.state.price,
            foodCategory: this.state.category,
        };
        var config = {
            headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
        };

        axios.post(`http://localhost:8080/foods`, food, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.status == 200) {
                    alert("Su")

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

        console.log(food);
        window.location.reload()
    }
    onDeleteO = (id) => {
        var config = {
            headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
        };
        axios.delete(`http://localhost:8080/orders/` + id, config)
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
        return (
            <Row className="justify-content-md-center">
                {/* <Nav />              */}
                <Col md={10} className="justify-content-md-center">
                    <Row className="justify-content-md-center">
                        <Col md={6} xl={4}>
                            <Card>
                                <Card.Header>
                                    <Card.Title as='h5'>Users</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-12">
                                            <h3 className="align-items-center">{this.state.userCount}</h3>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={4}>
                            <Card>
                                <Card.Header>
                                    <Card.Title as='h5'>Ongonin Orders</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-12">
                                            <h3 className="align-items-center">{this.state.oCount}</h3>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4}>
                            <Card>
                                <Card.Header>
                                    <Card.Title as='h5'>Finished Orders</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row d-flex align-items-center">
                                        <div className="col-12">
                                            <h3 className="align-items-center">{this.state.fCount}</h3>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={12} xl={12}>
                            <Tabs defaultActiveKey="new" id="uncontrolled-tab-example">
                                <Tab eventKey="new" title="New Orders">
                                    <Card className='Recent-Users'>
                                        <Card.Header>
                                            <Card.Title as='h5'>New Orders</Card.Title>
                                        </Card.Header>
                                        <Card.Body className='px-0 py-2'>

                                            <Table responsive hover>
                                                <tbody>
                                                    {this.state.orders.map(function (item, i) {


                                                        if (item.status == false) {

                                                            return (
                                                                <tr key={i} className="unread">
                                                                    <td>
                                                                        <h6 className="mb-1">{item.items}</h6>
                                                                        <p className="m-0">{item.orderId}</p>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="text-muted">
                                                                            <i className="fa fa-circle text-c-green f-10 m-r-15" />LKR {item.cost}.00
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        <button className="label theme-bg2 text-white f-12" onClick={() => {
                                                                            const config = {
                                                                                headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
                                                                            };
                                                                            const url = "http://localhost:8080/orders/" + item.orderId
                                                                            axios.delete(url,config)
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
                                                                        }}>Reject</button>
                                                                        <button className="label theme-bg text-white f-12" onClick={() => this.onApprove(item.orderId)}>Approve</button></td>
                                                                </tr>
                                                            )
                                                        }

                                                    })
                                                    }


                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Tab>
                                <Tab eventKey="past" title="Finished orders">
                                    <Card className='Recent-Users'>
                                        <Card.Header>
                                            <Card.Title as='h5'>Finished Orders</Card.Title>
                                        </Card.Header>
                                        <Card.Body className='px-0 py-2'>

                                            <Table responsive hover>
                                                <tbody>
                                                    {this.state.orders.map(function (item, i) {
                                                        if (item.status == true) {
                                                            return (
                                                                <tr key={i} className="unread">
                                                                    <td>
                                                                        <h6 className="mb-1">{item.items}  </h6>
                                                                        <p className="m-0">{item.orderId}</p>
                                                                    </td>
                                                                    <td>
                                                                        <h6 className="text-muted">
                                                                            <i className="fa fa-circle text-c-green f-10 m-r-15" />LKR {item.cost}.00
                                                                        </h6>
                                                                    </td>
                                                                    <td>
                                                                        <button onClick={() => {
                                                                            const config = {
                                                                                headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }
                                                                            };
                                                                            axios.delete("http://localhost:8080/orders/" + item.orderId, {headers: { 'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3dmQuNTE0NjFAZ21haWwuY29tIiwiZXhwIjoxNTYyNDE5NzkyfQ.WOdt4392Ap7S1u3NnpxLO6MDC2gG20EAnDrpfX6TPqJV3HFck5fc9MTJN3ZRQJAlHumisC2rZ4pUId6Fen4pbg" }})
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
                                                                        }} className="label theme-bg2 text-white f-12" >Delete</button>

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }

                                                    })
                                                    }


                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Tab>

                            </Tabs>
                            <br /> <br /><br />
                        </Col>
                        <br /> <br /><br />
                        <Col md={6} xl={4}>
                            <Card className='card-social'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-facebook text-primary f-36" />
                                        </div>
                                        <div className="col text-right">
                                            <h3>12,281</h3>
                                            <h5 className="text-c-green mb-0">+7.2% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>35,098</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '60%', height: '6px' }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>350</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '45%', height: '6px' }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={4}>
                            <Card className='card-social'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-twitter text-c-blue f-36" />
                                        </div>
                                        <div className="col text-right">
                                            <h3>11,200</h3>
                                            <h5 className="text-c-purple mb-0">+6.2% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>34,185</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-green" role="progressbar" style={{ width: '40%', height: '6px' }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>800</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-blue" role="progressbar" style={{ width: '70%', height: '6px' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xl={4}>
                            <Card className='card-social'>
                                <Card.Body className='border-bottom'>
                                    <div className="row align-items-center justify-content-center">
                                        <div className="col-auto">
                                            <i className="fa fa-google-plus text-c-red f-36" />
                                        </div>
                                        <div className="col text-right">
                                            <h3>10,500</h3>
                                            <h5 className="text-c-blue mb-0">+5.9% <span className="text-muted">Total Likes</span></h5>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center card-active">
                                        <div className="col-6">
                                            <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Target:</span>25,998</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '80%', height: '6px' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Duration:</span>900</h6>
                                            <div className="progress">
                                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '50%', height: '6px' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={4}>
                            <Card>
                                <Card.Header>
                                    <Card.Title as='h5'>Add New Food Item</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <div className="row align-items-center justify-content-center">
                                        <Form.Control size="lg" name="category" as="select" className="mb-3" onChange={this.onChange} required>
                                            <option value="">Select Category</option>
                                            <option value="Breakfast">Breakfast</option>
                                            <option value="Lunch">Lunch</option>
                                            <option value="Dinner">Dinner</option>
                                        </Form.Control>
                                        <Form.Control type="text" name="foodName" placeholder="Food Name" className="mb-3" onChange={this.onChange} required />
                                        <Form.Control type="number" name="price" placeholder="Price" className="mb-3" onChange={this.onChange} required />
                                        <button className="label theme-bg text-white f-12" name="category" onClick={() => this.onSubmit()}>Add</button>

                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={8} className='m-b-30'>
                            <Tabs defaultActiveKey="breakfast" id="uncontrolled-tab-example">
                                <Tab eventKey="breakfast" title="Breakfast">
                                    <Table responsive hover>
                                        <tbody>
                                            {this.state.foods.map(function (item, i) {
                                                if (item.foodCategory == "Breakfast") {
                                                    return (
                                                        <tr key={i} className="unread">
                                                            <td>
                                                                <h6 className="mb-1">{item.foodName}</h6>
                                                                <p className="m-0">{item.foodName}</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.foodPrice}</h6>
                                                            </td>
                                                            <td><a className="label theme-bg2 text-white f-12">Reject</a><a className="label theme-bg text-white f-12">Approve</a></td>
                                                        </tr>
                                                    )
                                                }

                                            })
                                            }

                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab eventKey="lunch" title="Lunch">
                                    <Table responsive hover>
                                        <tbody>
                                            {this.state.foods.map(function (item, i) {
                                                if (item.foodCategory == "Lunch") {
                                                    return (
                                                        <tr key={i} className="unread">
                                                            <td>
                                                                <h6 className="mb-1">{item.foodName}</h6>
                                                                <p className="m-0">{item.foodName}</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.foodPrice}</h6>
                                                            </td>
                                                            <td><a className="label theme-bg2 text-white f-12">Reject</a><a className="label theme-bg text-white f-12">Approve</a></td>
                                                        </tr>
                                                    )
                                                }

                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab>
                                <Tab eventKey="dinner" title="Dinner">
                                    <Table responsive hover>
                                        <tbody>
                                            {this.state.foods.map(function (item, i) {
                                                if (item.foodCategory == "Dinner") {
                                                    return (
                                                        <tr key={i} className="unread">
                                                            <td>
                                                                <h6 className="mb-1">{item.foodName}</h6>
                                                                <p className="m-0">{item.foodName}</p>
                                                            </td>
                                                            <td>
                                                                <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{item.foodPrice}</h6>
                                                            </td>
                                                            <td><a className="label theme-bg2 text-white f-12">Reject</a><a className="label theme-bg text-white f-12">Approve</a></td>
                                                        </tr>
                                                    )
                                                }

                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </Tab>
                            </Tabs>
                        </Col>

                    </Row>
                </Col>
            </Row>

        );
    }
}

export default Dashboard;