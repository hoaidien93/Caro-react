import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import $ from 'jquery';
import { func } from 'prop-types';
import axios from 'axios';

class InfoComponent extends React.Component {
    constructor(props) {
        super(props);
        var me = this;
        this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

        this.state = {
            name: me.userInfo.name,
            gender: me.userInfo.gender,
            dateOfBirth: me.userInfo.dateOfBirth,
            fileUpload: null,
            avatar: me.userInfo.avatar
        };


    }

    logoutClick(e) {
        this.props.dispatch({
            type: "Logout"
        });
        localStorage.setItem("username", "");
        this.props.history.push('/login');
    }

    renderRedirect() {
        if (!this.props.isLogged && !localStorage.getItem("logged")) {
            return (
                <Redirect to='/login' />
            );
        } else {
            let username = localStorage.getItem("username");
            return (
                <div>
                    <div align="left" className="p2 f-left"><span>Hello {username}</span></div>
                    <div align="right" className="p2 f-right">
                        <Button variant="danger" type="button" onClick={(e) => { this.logoutClick(e) }}>Logout</Button>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="mb-3">
                <div className="p-2 menu-user">{this.renderRedirect()}</div>
                <div className="container">
                    <div className="wrapper w-50 user-info">
                        <div className="avatar">
                            <img src={"https://hoaidien-jwt.herokuapp.com/images/"+ this.state.avatar}/>
                            <input type="file" name="fileUpload" onChange={(e)=>{this.handleChangeFile(e)}}/>
                            <button className="btn-change-avatar btn btn-info mt-2" onClick={(e)=>{this.uploadAvatar(e)}}>Change Avatar</button>
                        </div>
                        <div className="row mt-2 w-100">
                                <div className="col-md-3">Username</div>
                                <input className="col-md-9 form-control" type="text" readOnly value={this.userInfo.username}/>
                        </div>
                        <div className="row mt-2 w-100">
                            <div className="col-md-3">Name</div>
                            <input className="col-md-9 form-control" type="text" name="name" value={this.state.name} onChange={(e)=>{this.handleChange(e)}}/>
                        </div>
                        <div className="row mt-2 w-100">
                            <div className="col-md-3">Gender</div>
                            <input className="col-md-9 form-control" type="text" name="gender"  value={this.state.gender} onChange={(e)=>{this.handleChange(e)}}/>
                        </div>
                        <div className="row mt-2 w-100">
                            <div className="col-md-3">Date of birth</div>
                            <input className="col-md-9 form-control" type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={(e)=>{this.handleChange(e)}}/>
                        </div>
                        <div className="row btn-wrapper">
                            <button className="btn btn-primary" onClick={(e)=>{this.handleSave(e)}}>Save Change</button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
    
    handleSave(e){
        e.target.disable = true;
        var me = this;
        let confirmChange = window.confirm("Are you sure ?");
        if(confirmChange){
            console.log(this.state);
            $.ajax({
                method: 'POST',
                url: "https://hoaidien-jwt.herokuapp.com/update-info",
                beforeSend: function(request){
                    request.setRequestHeader("Authorization","Bearer "+localStorage.getItem("token"));
                },
                data: {
                    "name": this.state.name,
                    "gender": this.state.gender,
                    "dateOfBirth": this.state.dateOfBirth
                },
                success: function(res){
                    console.log(res);
                    alert(res.status);
                    let oldUserInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};
                    oldUserInfo.name = me.state.name;
                    oldUserInfo.gender = me.state.gender;
                    oldUserInfo.dateOfBirth = me.state.dateOfBirth;

                    window.localStorage.setItem("userInfo",JSON.stringify(oldUserInfo));
                },
                error: function(err){
                 
                    console.log(err);
                    return;
                }
            });
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChangeFile(e){
        this.setState({
            fileUpload: e.target.files[0]
        });
    }

    uploadAvatar(e){
        var me = this;
        let formData = new FormData();
        formData.append("avatar",this.state.fileUpload);
        axios.post('https://hoaidien-jwt.herokuapp.com/update-image',formData,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem("token")
            }}).then((response)=>{
                alert(response.data.status);
                 me.setState({
                     avatar: response.data.pathAvatar
                 });
            });
        console.log(this.state);
    }
}
function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    };
};
export default connect(mapStateToProps)(InfoComponent);