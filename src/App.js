import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import StoresPage from "./StoresPage";
//import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import SearchPage from "./SearchPage";
import SettingsPage from "./SettingsPage";
import axios from "axios";
import {Redirect, Route} from "react-router";


class App extends React.Component {

    state = {
        isLoggedIn: false,
        token : "",
        textFromWebsocket : "",
        isFirstLogIn:""

    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token: cookies.get("logged_in")
            })
            axios.get("http://localhost:8989/first-sign-in",{
                params: {token: cookies.get("logged_in")}
            }).then(response=>{
                if (response.data) {
                    this.setState({
                        isFirstLogIn: 0
                    })
                    const data =new FormData();
                    data.append("token",cookies.get("logged_in"))
                    axios.post("http://127.0.0.1:8989/after-first-sign-in",data)
                        .then((response)=>{})
                } else {
                    this.setState({isFirstLogIn: 1})

                }
            })
        }
        const ws = new WebSocket("ws://localhost:8989/stream?token=7791");
        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            this.setState({
                textFromWebsocket : data.text
            })
        }

    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                                <div>
                                    {
                                        this.state.isFirstLogIn == 0 ?
                                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                                <NavigationBar/>
                                                <Redirect to={"/settings"}/>
                                                <Route path={"/profile"} component={ProfilePage} exact={true}/>
                                                <Route path={"/stores"} component={StoresPage} exact={true}/>
                                                <Route path={"/freeSearch"} component={SearchPage} exact={true}/>
                                                <Route path={"/settings"} component={SettingsPage} exact={true}/>
                                                <Route path={"/store/:storeId"} component={StoresPage}/>
                                            </div>
                                            :
                                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                                <NavigationBar/>
                                                <Redirect to={"/profile"}/>
                                                <Route path={"/profile"} component={ProfilePage} exact={true}/>
                                                <Route path={"/stores"} component={StoresPage} exact={true}/>
                                                <Route path={"/freeSearch"} component={SearchPage} exact={true}/>
                                                <Route path={"/settings"} component={SettingsPage} exact={true} />
                                                <Route path={"/store/:storeId"} component={StoresPage}/>
                                            </div>
                                        }
                                </div>
                                :
                            <div>
                                <Route path={"/"} component={LoginPage}/>
                            </div>


                    }
                </BrowserRouter>

                <div>
                   Web socket : {this.state.textFromWebsocket}
                </div>
            </div>
        )
    }

}

export default App;
