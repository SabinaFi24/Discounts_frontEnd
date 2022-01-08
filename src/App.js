import './App.css';
import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import StoresPage from "./StoresPage";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import LoginPage from "./LoginPage";
import Cookies from "universal-cookie";
import SearchPage from "./SearchPage";
import SettingsPage from "./SettingsPage";

class App extends React.Component {

    state = {
        isLoggedIn: false,
        token : "",
        textFromWebsocket : ""

    }

    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
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
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                <Route path={"/"} component={ProfilePage} exact={true}/>
                                <Route path={"/profile"} component={ProfilePage} exact={true}/>
                                <Route path={"/stores"} component={StoresPage} exact={true}/>
                                <Route path={"/freeSearch"} component={SearchPage} exact={true}/>
                                <Route path={"/settings"} component={SettingsPage}/>
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
