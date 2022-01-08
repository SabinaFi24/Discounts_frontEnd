import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import UserComponent from "./UserComponent";

class SearchPage extends React.Component {
    state = {}

    render = () => {
        return (
            <div>
                {
                    this.state.followed.map((followed) => {
                        return (
                            <div>
                                <UserComponent user={followed}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SearchPage;