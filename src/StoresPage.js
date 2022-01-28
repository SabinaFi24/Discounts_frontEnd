import './App.css';
import * as React from "react";
import axios from "axios";
import SaleColor from "./SaleColor";
import storeComponent from "./storeComponent";

class StoresPage extends React.Component{
    state = {
        id:"",
        sales :[],
        storeName:""

    }
    componentDidMount() {
        const id =this.props.match.params.id;
        this.getSales(id)
        this.getStoreName(id)
    }

    getSales =(id)=>{
        axios.get("http://localhost:8989/get-sales-by-store-id", {
            params : {
                id:id
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
    getStoreName =(id)=>{
        axios.get("http://localhost:8989/get-store-by-store-id", {
            params :
                {
                    id:id
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