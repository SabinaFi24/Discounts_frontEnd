import './App.css';
import * as React from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import {Redirect} from "react-router";

class LoginPage extends React.Component {
    state = {
        username: "",
        password: "",
        showError: false,
        noProblems: false,
        response: "",
        newPath : "/profile"
    }

    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }

    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    login=()=>{
        axios.get("http://localhost:8989/sign-in",{
            params: {
                username: this.state.username,
                password: this.state.password
            } }).then(response=> {
            if(response.data){
                this.setState({noProblems:true})
                const cookies = new Cookies();
                cookies.set("logged_in", response.data);
                //window.location.reload();
                axios.get("http://localhost:8989/first-sign-in",{
                    params:{
                        token:response.data
                    }
                }).then(response=> {
                    if (response.data) {
                        this.setState({
                            newPath: "/profile"

                        })
                        //this.props.router.push('/profile')

                    } else {
                        this.setState({
                            newPath: "/settings"
                        })
                        //this.props.router.push('/profile')
                    }
                })
                window.location.reload();
            }
            else { this.setState({response: "something wrong"})}

            })
    }

    signUp = () => {
        axios.get("http://localhost:8989/create-account", {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then((response) => {
                if (response.data) {
                    this.setState({noProblems:true,response: "Your account has been created!",})
                } else {
                    this.setState({showError: true, response: "This username is already taken"})
                }
            })
    }

    render() {


        const inputStyle = {
            margin: "10px",
            width: "200px"
        }

        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        const signUpButtonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "5px",
            marginTop: "20px"
        }

        const hasRequiredDetails = !(this.state.username == "" || this.state.password == "");

        {if(this.state.showError) return (<Redirect to={(this.state.newPath)}/>)}
            return(
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <Redirect to={(this.state.newPath)}/>
                <fieldset style={{width: "300px"}}>
                    <legend>
                        <div style={{fontSize: "20px"}}>
                            Login to your account
                        </div>
                    </legend>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter username"}
                    />
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}
                           value={this.state.password}
                           placeholder={"Enter password"}
                    />
                    <div>
                        <button style={buttonStyle} onClick={this.login} disabled={!hasRequiredDetails} >Login</button>
                    </div>
                    <div>
                        <button style={signUpButtonStyle} onClick={this.signUp} disabled={!hasRequiredDetails} >Sign Up</button>
                    </div>

                </fieldset>
                <div style={{color: "red"}}>{this.state.response}</div>
            </div>
        )
    }
}
export default LoginPage;
