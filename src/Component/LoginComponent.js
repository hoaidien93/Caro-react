import React from 'react';
import { Form, Button } from 'react-bootstrap'
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    loginClick(){
        console.log('clicked');
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <div className="form-login">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.loginClick}>Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;