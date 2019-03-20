import React from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {createUserAPI} from "../../utils/HTTP";
import {Link} from "react-router-dom";

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    createUser = (event) => {
        event.preventDefault();
        const requestData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        try {
            const response = createUserAPI(requestData);
            /*if (response.data.status === 200) {

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
                    <strong>REGISTER</strong>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={this.createUser}>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control autoFocus type="text" value={this.state.username}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control autoFocus type="email" value={this.state.email}
                                          onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} onChange={this.handleChange} type="password"/>
                        </Form.Group>
                        <Form.Group controlId="reviewer">
                            <Form.Check type="checkbox" label="Reviewer"/>
                        </Form.Group>
                        <Button block disabled={!this.validateForm()} type="submit">
                            Register
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    <Link to='/login'>Already a member? Click here to Login</Link>
                </Card.Footer>
            </Card>
        );
    }
}