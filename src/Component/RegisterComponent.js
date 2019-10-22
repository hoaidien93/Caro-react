import React from 'react';
import { Form, Button } from 'react-bootstrap'

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    registerClick(){
        console.log('clicked');
    }

    render() {
        return (
            <div>
                <h4>Register</h4>
                <div className="form-login">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control type="email" placeholder="Enter your name" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control type="passwordRepeat" placeholder="Repeat Password" required/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.registerClick}>Register</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;