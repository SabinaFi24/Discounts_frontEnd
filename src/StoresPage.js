/*import './App.css';
import * as React from "react";
import axios from "axios";
import Cookies from "universal-cookie/es6";
import {Redirect, Route} from "react-router";

class StoresPage extends React.Component {
    state = {
        stores: [],
        redirect: false,
        disable : true,
        currentStoreName: ""
    }

    componentDidMount() {
        this.getAllStores()
    }

    getAllStores = () => {
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
    sabina =()=>{
        const test=this.state.disable
        this.setState({
            disable : !test
        })
    }

    render() {
        return (
            <div>
                {this.state.stores.map(store => {
                    return (
                        <ul>
                            <button style={{border :"white"}} onClick={this.setRedirect} >{store.name} </button>
                        </ul>


                    )
                })
                }
            </div>
        )
    }
}

export default StoresPage;*/
import React from "react";
import axios from "axios";
import Sale from "./Sale";
import {AiOutlineShop} from "react-icons/ai";



class StorePage extends React.Component{
    state = {
        id:"",
        sales :[],
        storeName:""

    }
    componentDidMount() {
        const id =this.props.match.params.storeId;
        this.getSales(id)
        this.getStoreName(id)
    }

    getSales =(id)=>{
        console.log("store number is:"+id);
        axios.get("http://localhost:8989/get-sales-by-store-id", {
            params :
                {
                    storeId:id
                }}).then((response)=>{
            const sales=response.data;
            if (response.data){
                console.log("data is: "+response.data)
                this.setState({
                    sales:sales
                });
            }
            else{
                this.setState({
                    sales:[]
                })
            }
        })
    }
    getStoreName =(id)=>{
        axios.get("http://localhost:8989/settings-change", {
            params :
                {
                    storeId:id
                }}).then((response)=>{
            if (response.data){
                this.setState({
                    storeName:response.data
                });
            }
        })
    }

    render(){
        return(
            <div style={{textAlign:"center"}}>
                <h1>{this.state.storeName.toUpperCase()} <AiOutlineShop/></h1>

                {this.state.sales.length>0?
                    this.state.sales.map((sale)=>{
                        return(
                            <div>
                                <div>
                                    <saleColor data={sale}/>
                                </div>
                                <p>

                                </p>
                            </div>
                        )
                    }):
                    <div>This store don't offer any promotions </div>
                }

            </div>
        )
    }
}

export default StorePage;