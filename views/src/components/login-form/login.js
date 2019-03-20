import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {loginAPI} from "../../utils/HTTP";
import {Link} from "react-router-dom";

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    authenticate = (event) => {
        event.preventDefault();
        const requestData = {
            username: this.state.username,
            password: this.state.password
        };

        try {
            const response = loginAPI(requestData);
            /*if (response.data.status === 200) {
                if (!response.data.accessToken) {
                    this.reset();
                    return;
                }

                storeData('accessToken', response.data.accessToken);
            }*/
        } catch (e) {
            console.log(e);
        }
    };

    validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    };

    render() {
        return (
            <Card>
                <Card.Header>
                    <strong>LOGIN</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.authenticate}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.username}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Button block disabled={!this.validateForm()} type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Link to='/createUser'>Not yet registered? Click here to Register</Link>
                </Card.Footer>
            </Card>
        );
    }
}