import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import LoginForm from "../../components/login-form/login";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={6}>

                    </Col>
                    <Col sm={6}>
                        <LoginForm/>
                    </Col>
                </Row>
            </Container>
        );
    }
}