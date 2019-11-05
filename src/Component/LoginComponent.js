import React from 'react';
import { Form, Button } from 'react-bootstrap'
import $ from 'jquery';
import {connect} from 'react-redux';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password: "",
            isLogged: false
        };
    }

    loginClick(e){
        var me = this;
        e.target.disabled = true;
        // Call API
        $.ajax({
            method: 'POST',
            url: "http://localhost:3001/user/login",
            data: {
                "username": this.state.username,
                "password": this.state.password
            },
            success: function(res){
                console.log(res);
                alert(res.status);
                me.props.dispatch({
                    type: "Logged"
                });
                localStorage.setItem("username", me.state.username);
                localStorage.setItem("token", res.token);
                localStorage.setItem("userInfo",JSON.stringify(res.userInfo));


                me.props.history.push('/');
            },
            error: function(err){
                console.log(err);
                return;
            }
        });
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>Login</h4>
                <div className="form-login">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" required  value={this.state.email} name="username" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={this.state.password} name="password" onChange={(e)=>{this.handleChange(e)}}/>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={(e)=>{this.loginClick(e)}}>Login</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connect()(LoginComponent);