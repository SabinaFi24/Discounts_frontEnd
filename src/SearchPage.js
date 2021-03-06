import './App.css';
import * as React from "react";
import Cookies from "universal-cookie/es6";
import axios from "axios";
import SaleColor from "./SaleColor";


class SearchPage extends React.Component {
    state = {
        sales:[],
        usersSales :[],
        search: "",
        border: ""
    }
    componentDidMount() {
        this.getAllSales()
        this.getSaleByUser();
    }

    search = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    filter = () => {
        const filtered = this.state.sales.filter(sale => {
            return (sale.content.includes(this.state.search))
        })
        return filtered;
    }

    getAllSales=()=> {
        axios.get("http://localhost:8989/get-all-sales", {
        })
            .then((response) => {
                if(response.data){
                    this.setState({
                        sales: response.data
                    })
                }else{
                    this.setState({sales:[]})
                }

            })
    }
    getSaleByUser=()=>{
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-sales-by-user",{
            params:{
                token:cookies.get("logged_in")
            }
        }).then((response)=>{

            if(response.data){
                this.setState({usersSales:response.data})
            }else {
                this.setState({usersSales:[]})
            }

        })

    }

    doseUserGetSale =(id)=>{
        const userSale = this.state.usersSales.find(sales => {
            return sales.id == id;
        })
        return userSale != undefined;
    }




    render() {
        return(
            <div style={{textAlign:"center"}}>
                <h1>Search Sales:</h1>
                <p>
                    <input type="text"
                           onChange={this.search}
                           placeholder={"Search here ..."}
                    />
                </p>

                {
                    this.filter().map(sale => {
                        return (
                            <SaleColor
                                data={sale}
                                key={sale.id}
                                border={sale.isForAll != 0 ? "green" : this.doseUserGetSale(sale) ? "green" : "red"}/>
                        )
                    })
                }
            </div>
        )

    }
}

export default SearchPage;