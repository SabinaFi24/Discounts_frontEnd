import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Redirect, Route} from "react-router";

class StoresPage extends React.Component {
    state = {
        stores: [],
        redirect: false,
        currentStoreName: ""
    }

    componentDidMount() {
        this.getAllStores()
    }

    getAllStores = () => {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-all-stores", {
        })
            .then((response) => {
                if(response.data.length>0){
                    this.setState({
                        stores: response.data
                    })
                }else{
                    this.setState({stores:[]})
                }

            })
    }
    setRedirect = (e) => {
        this.setState({
                redirect: true,
                currentStoreName: e.target.name
            }
        )
    }

    redirect = () => {
        if(this.state.redirect)
            return<Redirect to={{
                pathname: '/stores',
                state:{ store: this.state.currentStoreName }
            }}/>
    }

    render() {
        return (
            <div>
                {this.state.stores.map(store => {
                    return (
                        <ul>
                            <button style={{border :"white"}} onClick={this.setRedirect}>{store.name}</button>
                        </ul>


                    )
                })
                }
            </div>
        )
    }
}

export default StoresPage;