import './App.css';
import * as React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie/es6";

class StoresPage extends React.Component{
    state = {
        stores: []
    }

    componentWillMount() {
        this.getStores()
    }

    getStores = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-all-stores", {
            params: {
                token: cookies.get("logged_in")
            }
        })
            .then((response) => {
                if(response.data){
                    this.setState({
                        stores: response.data
                    })
                }
            })
    }

    render() {
        return(
            <div>
                <h1>Stores</h1>
                <div>
                    <div >
                        {
                            this.state.stores.length > 0 ?
                                this.state.stores.map(store => {
                                    return (
                                        <div>
                                            <Link to={"stores/" + store.id}>
                                                {store.name}
                                            </Link>
                                        </div>
                                    )
                                })
                                :
                                <div>There are no stores</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default StoresPage;