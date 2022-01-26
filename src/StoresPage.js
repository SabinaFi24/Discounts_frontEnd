import './App.css';
import * as React from "react";
import axios from "axios";
import SaleColor from "./SaleColor";
import storeComponent from "./storeComponent";

class StoresPage extends React.Component{
    state = {
        storeId:"",
        sales :[],
        storeName:""

    }
    componentDidMount() {
        const storeId =this.props.match.params.storeId;
        this.getSales(storeId)
        this.getStoreName(storeId)
    }

    getSales =(storeId)=>{
        axios.get("http://localhost:8989/get-sales-by-store-id", {
            params : {
                    storeId:storeId
                }}).then((response)=>{
            const sales=response.data;
            if (response.data){
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
    getStoreName =(storeId)=>{
        axios.get("http://localhost:8989/get-store-by-store-id", {
            params :
                {
                    storeId:storeId
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
                <h1>{this.state.storeName}</h1>

                {this.state.sales.length>0?
                    this.state.sales.map((sale)=>{
                        return(
                            <div>
                                <div>
                                    <storeComponent data={sale}/>
                                </div>

                            </div>
                        )
                    }):
                    <div>The store has no sales yet.. </div>
                }

            </div>
        )
    }
}

export default StoresPage;